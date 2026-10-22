#!/usr/bin/env python3
"""Export reviewed evidence and separately labelled AI augmentation, without training."""
import hashlib
import json
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'training-data/reusable-language-memory'

def read(path):
    return json.loads((ROOT / path).read_text(encoding='utf-8'))

def lines(path):
    return [json.loads(s) for s in (ROOT / path).read_text(encoding='utf-8').splitlines() if s.strip()]

def key(text):
    return re.sub(r'[^\w\s]', '', unicodedata.normalize('NFC', text)).casefold().strip()

def write(name, rows):
    (OUT / name).write_text(''.join(json.dumps(r, ensure_ascii=False) + '\n' for r in rows), encoding='utf-8')

def build():
    OUT.mkdir(parents=True, exist_ok=True)
    heldout = read('training-data/user-reviewed-heldout-grammar.json')['records']
    protected = {key(r['english']) for r in heldout}
    inputs = []
    path = 'training-data/user-approved-grammar-pairs.json'
    for r in read(path)['records']:
        inputs.append((path, r, {'name': 'Project-owner grammar review', 'license': 'not-specified'}))
    path = 'training-data/approved-parallel.jsonl'
    for r in lines(path):
        if r.get('humanReview') == 'approved-by-project-owner':
            inputs.append((path, r, r.get('source', {})))
    path = 'training-data/hadith-corrections/approved-passages.jsonl'
    for r in lines(path):
        if r.get('status') == 'approved-by-project-owner':
            inputs.append((path, r, {'name': r.get('source'), 'license': 'not-specified'}))
    grouped = {}
    excluded = []
    for path, r, source in inputs:
        en, ks = r['english'].strip(), r['kashmiri'].strip()
        if key(en) in protected:
            excluded.append({'english': en, 'sourceFile': path, 'reason': 'protected-diagnostic'})
            continue
        identity = (key(en), unicodedata.normalize('NFC', ks))
        if identity not in grouped:
            grouped[identity] = {'id': hashlib.sha256(('\0'.join(identity)).encode()).hexdigest()[:20], 'english': en, 'kashmiri': ks, 'review': 'approved-by-project-owner', 'independentlyValidated': False, 'origin': 'existing-reviewed-project-data', 'provenance': [], 'commercialTrainingEligible': False}
        grouped[identity]['provenance'].append({'sourceFile': path, 'sourceRecordId': r.get('id'), 'source': source})
    records = list(grouped.values())
    by_en = defaultdict(list)
    for r in records:
        by_en[key(r['english'])].append(r['id'])
    for r in records:
        r['targetConflict'] = len(by_en[key(r['english'])]) > 1
        r['trainingEligibleAfterRightsReview'] = not r['targetConflict']
    patterns = read('training-data/hadith-corrections/grammar-patterns.json')
    for r in patterns:
        r.update(sourceFile='training-data/hadith-corrections/grammar-patterns.json', scope='context-specific owner preference; not a universal grammar rule')
    vocabulary = lines('training-data/hadith-corrections/preference-pairs.jsonl')
    # English paraphrases reuse approved targets, but equivalence still requires review.
    paraphrases = {'I read books regularly.': 'I regularly read books.', 'I write letters regularly.': 'I regularly write letters.', 'She reads books regularly.': 'She regularly reads books.', 'We went home yesterday.': 'Yesterday, we went home.', 'We go to school every day.': 'Every day, we go to school.'}
    synthetic = []
    for r in records:
        if r['english'] in paraphrases:
            synthetic.append({'id': 'ai-' + r['id'], 'english': paraphrases[r['english']], 'kashmiri': r['kashmiri'], 'parentId': r['id'], 'origin': 'assistant-generated-english-paraphrase', 'review': 'pending-human-review', 'trainingEligible': False, 'commercialTrainingEligible': False, 'note': 'Target copied from approved parent; new pair equivalence is not approved.'})
    tokens = Counter(t for r in records for t in r['kashmiri'].split())
    write('reviewed-pairs.jsonl', records)
    write('ai-candidates.jsonl', synthetic)
    write('grammar-patterns.jsonl', patterns)
    write('terminology-preferences.jsonl', vocabulary)
    write('token-inventory.jsonl', [{'token': t, 'occurrences': n, 'type': 'surface-token-not-dictionary-entry'} for t, n in sorted(tokens.items())])
    write('excluded-diagnostics.jsonl', excluded)
    manifest = {'reviewedPairs': len(records), 'grammarPatterns': len(patterns), 'terminologyPreferences': len(vocabulary), 'aiCandidatesPendingReview': len(synthetic), 'uniqueSurfaceTokens': len(tokens), 'conflictingEnglishKeys': sum(len(v) > 1 for v in by_en.values()), 'excludedDiagnosticRows': len(excluded), 'neuralTrainingPerformed': False, 'commercialTrainingEligiblePairs': 0, 'policy': 'Preserve source rights. Unspecified licenses require review; approval of language is not a license grant. AI candidates are never gold. Keep diagnostic inputs out of training. Do not strip diacritics or overwrite spelling.'}
    (OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(manifest, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    build()
