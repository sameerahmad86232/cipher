#!/usr/bin/env python3
"""Validate trained artifact, data isolation, and declared training results."""
import hashlib,json
from pathlib import Path
import torch
root=Path(__file__).resolve().parents[1];out=root/'training-data/approved-opus-cpu'
report=json.loads((out/'report.json').read_text());split=json.loads((out/'split.json').read_text())
source=root/'training-data/opus-sentence-review/approved-pairs.jsonl'
rows={r['id']:r for r in map(json.loads,source.read_text().splitlines())}
train=set(split['trainIds']);val=set(split['validationIds']);excluded={r['id'] for r in split['excluded']}
assert not train & val and not (train|val)&excluded
assert train|val|excluded==set(rows)
def groups(ids):return {(rows[i]['source'],rows[i]['alignmentLine']) for i in ids}
assert not groups(train)&groups(val)
assert all(rows[i]['trainingEligible'] and not rows[i]['conflictingTargets'] for i in train|val)
assert all(rows[i]['english']!='He is also the member of parliament (MP) for Gandhinagar.' for i in train|val)
assert report['inputSHA256']==hashlib.sha256(source.read_bytes()).hexdigest()
assert len(train)==report['trainPairs'] and len(val)==report['validationPairs']
checkpoint=torch.load(out/'model.pt',map_location='cpu',weights_only=True)
assert all(torch.isfinite(t).all() for t in checkpoint['state_dict'].values())
expected_chars=set(''.join(rows[i]['english']+rows[i]['kashmiri'] for i in train))
assert set(checkpoint['vocabulary'][4:])==expected_chars
assert len(report['history'])==report['epochs']==3
assert report['neuralTrainingPerformed'] and not report['productionEligible']
print(f'PASS: {len(train)} training and {len(val)} validation pairs; parent isolation, vocabulary isolation, finite saved weights and report checked.')
