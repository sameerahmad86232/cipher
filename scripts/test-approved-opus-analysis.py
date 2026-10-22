#!/usr/bin/env python3
import hashlib,importlib.util,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('analysis',root/'scripts/analyze-approved-opus-sentences.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
j=json.loads(m.OUT.read_text());rows=[json.loads(s) for s in m.SOURCE.read_text().splitlines()]
assert j['inputPairs']==len(rows)==4208
assert j['inputSHA256']==hashlib.sha256(m.SOURCE.read_bytes()).hexdigest()
byid={r['id']:r for r in rows}
for name,p in m.PATTERNS.items():
 forms={m.folded(x) for x in p['forms']}
 expected=[r for r in rows if set(m.tokens(r['kashmiri'])) & forms]
 ev=j['constructionEvidence'][name]
 assert ev['matchingRows']==len(expected)
 for ex in ev['examples']:
  assert ex['kashmiri']==byid[ex['id']]['kashmiri'] and ex['english']==byid[ex['id']]['english']
assert m.folded('مَنٛز')=='منز'
assert not j['neuralTrainingPerformed']
print('PASS: all 4208 records, construction counts, example provenance and input hash checked.')
