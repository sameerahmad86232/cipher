#!/usr/bin/env python3
"""Check complete source coverage and draft boundaries for the reader."""
import json,re,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
j=json.loads((root/'public/seerah/chapter-one.json').read_text())
rows=j['passages']
assert len(rows)==52 and len({r['id'] for r in rows})==52
assert len(j['sections'])==7
assert all(r['english'] and r['kashmiri'] and not r['trainingEligible'] for r in rows)
assert all(r['reviewStatus']=='draft-awaiting-owner-review' for r in rows)
assert {b['page'] for r in rows for b in r['sourceBlocks']}==set(range(8,14))
assert all(r['sourceEnglish']==' '.join(b['text'] for b in r['sourceBlocks']) for r in rows)
assert all(r['section'] in {s['id'] for s in j['sections']} for r in rows)
if len(sys.argv)>1:
 import fitz,hashlib
 pdf=Path(sys.argv[1]);doc=fitz.open(pdf)
 assert hashlib.sha256(pdf.read_bytes()).hexdigest()==j['sourceSHA256']
 actual=[]
 for i in range(7,13):
  for b in doc[i].get_text('blocks'):
   text=' '.join(b[4].split())
   if text not in ('MSA NIU',str(i+1),'Location and Nature of Arab Tribes','Location of the Arabs','Arab Tribes') and text:actual.append((i+1,text))
 expected=[(b['page'],b['text']) for r in rows for b in r['sourceBlocks']]
 assert expected==actual,'Missing or reordered source block'
print('PASS: complete first chapter, 52 passages, 7 sections, original source coverage and review-only eligibility.')
