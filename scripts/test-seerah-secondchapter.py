"""Validate second chapter translation and exact ordered PDF source coverage."""
import json,sys,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'public/seerah/chapter-two.json').read_text())
rows=data['passages']
assert len(rows)==45 and len({r['id'] for r in rows})==45
assert len(data['sections'])==9
assert all(r['kashmiri'].strip() and r['english'].strip() and not r['trainingEligible'] for r in rows)
assert all(r['reviewStatus']=='draft-awaiting-owner-review' for r in rows)
assert all(r['section'] in {s['id'] for s in data['sections']} for r in rows)
assert all(r['sourceEnglish']==' '.join(b['text'] for b in r['sourceBlocks']) for r in rows)
if len(sys.argv)>1:
 import fitz
 pdf=Path(sys.argv[1]);doc=fitz.open(pdf)
 assert hashlib.sha256(pdf.read_bytes()).hexdigest()==data['sourceSHA256']
 heads={'Rulership and Princeship among the Arabs','Rulership in Yemen','Rulership in Heerah','Rulership in Geographical Syria','Rulership in Hijaz','The Reasons of this War have been illustrated in Three Versions','Rulership in Pan-Arabia','The Political Situation'}
 actual=[]
 for i in range(13,21):
  for b in doc[i].get_text('blocks'):
   t=' '.join(b[4].split())
   if t and t not in heads|{'MSA NIU',str(i+1)}:actual.append((i+1,t))
 assert [(b['page'],b['text']) for r in rows for b in r['sourceBlocks']]==actual
print('PASS: Chapter 2: 45 translated passages, 9 sections, complete ordered source coverage; drafts excluded from training.')
