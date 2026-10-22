#!/usr/bin/env python3
"""Check provenance, review boundaries, conflicts, and diagnostic isolation."""
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('builder', ROOT / 'scripts/build-reusable-language-memory.py')
b = importlib.util.module_from_spec(spec)
spec.loader.exec_module(b)

def load(name):
    return [json.loads(s) for s in (b.OUT / name).read_text(encoding='utf-8').splitlines()]

pairs = load('reviewed-pairs.jsonl')
candidates = load('ai-candidates.jsonl')
ids = {r['id'] for r in pairs}
assert len(ids) == len(pairs)
protected = {b.key(r['english']) for r in b.read('training-data/user-reviewed-heldout-grammar.json')['records']}
assert all(b.key(r['english']) not in protected for r in pairs + candidates)
for r in pairs:
    assert r['provenance'] and r['review'] == 'approved-by-project-owner'
    assert all((ROOT / p['sourceFile']).is_file() for p in r['provenance'])
    assert r['commercialTrainingEligible'] is False
    siblings = [s for s in pairs if b.key(s['english']) == b.key(r['english'])]
    assert r['targetConflict'] == (len(siblings) > 1)
    assert r['trainingEligibleAfterRightsReview'] == (len(siblings) == 1)
for r in candidates:
    assert r['parentId'] in ids and not r['trainingEligible']
    assert r['review'] == 'pending-human-review'
    parent = next(p for p in pairs if p['id'] == r['parentId'])
    assert r['kashmiri'] == parent['kashmiri']
assert b.key('Yesterday, we went home.') == b.key('Yesterday we went home.')
assert all('sourceFile' in r and 'scope' in r for r in load('grammar-patterns.jsonl'))
print(f'PASS: {len(pairs)} reviewed pairs, {len(candidates)} isolated AI candidates; provenance, conflicts and diagnostic isolation checked.')
