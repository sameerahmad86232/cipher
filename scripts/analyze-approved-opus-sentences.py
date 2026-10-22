#!/usr/bin/env python3
"""Descriptive construction evidence; no parser, alignment proof or training."""
import hashlib,json,re,unicodedata
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'training-data/opus-sentence-review/approved-pairs.jsonl'
OUT=ROOT/'training-data/opus-sentence-review/analysis.json'
def folded(s):
 return ''.join(c for c in unicodedata.normalize('NFD',s) if unicodedata.category(c)!='Mn')
def tokens(s):return re.findall(r'[\u0600-\u06ff]+',folded(s))
PATTERNS={
 'copula_or_auxiliary':{'forms':['چھ','چھہ','چھس','چھے','چھِ','چُھ'],'interpretation':'Copula/auxiliary family. Exact inflection and agreement need context.'},
 'past_auxiliary':{'forms':['اوس','آس','آسی','آسے'],'interpretation':'Forms compatible with past copular/auxiliary constructions; tense is not proven by token presence.'},
 'interior_postposition':{'forms':['منز'],'interpretation':'Noun/pronoun followed by منز often expresses in/within; case and direction vary.'},
 'surface_or_source_postposition':{'forms':['پؠٹھ','پیٹھ'],'interpretation':'Often on/from; select meaning from the predicate and context.'},
 'negation':{'forms':['نہ','نہٕ','چھنہ','چُھنہ'],'interpretation':'Negation may appear separately or attached to an auxiliary; scope requires clause analysis.'},
 'coordination':{'forms':['تہ'],'interpretation':'Often coordinates phrases or clauses as and; not always an English word-for-word alignment.'},
 'relative_forms':{'forms':['یس','یوس','یم','یوسہ'],'interpretation':'Potential relative/correlative forms; noun/number/context determine reading.'},
 'genitive_forms':{'forms':['ہند','ہنز','سند','سنز'],'interpretation':'Genitive constructions have agreement-sensitive forms; do not replace every English possessive with one fixed form.'},
 'subordinator_zi':{'forms':['ز','زِ'],'interpretation':'Potential complement/clause introducer; single-letter matches may be ambiguous.'},
 'purpose_expressions':{'forms':['خاطر','خاطرہ','باپت','خاطرٕ'],'interpretation':'Purpose or benefit expressions; English for can also have other meanings.'},
}
def build():
 rows=[json.loads(s) for s in SOURCE.read_text().splitlines()]
 evidence={};vocab=Counter();bigrams=Counter();trigrams=Counter()
 for r in rows:
  ts=tokens(r['kashmiri']);vocab.update(ts)
  bigrams.update(zip(ts,ts[1:]));trigrams.update(zip(ts,ts[1:],ts[2:]))
 for name,p in PATTERNS.items():
  forms={folded(x) for x in p['forms']}
  hits=[r for r in rows if set(tokens(r['kashmiri'])) & forms]
  examples=sorted(hits,key=lambda r:(r['conflictingTargets'],abs(len(r['english'].split())-10),r['id']))[:5]
  evidence[name]={'matchingRows':len(hits),'shareOfRows':round(len(hits)/len(rows),4),'matchingFormsAfterMarkFolding':sorted(forms),'interpretation':p['interpretation'],'examples':[{'id':r['id'],'english':r['english'],'kashmiri':r['kashmiri']} for r in examples]}
 result={'inputPairs':len(rows),'inputSHA256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'method':'Descriptive Arabic-token counts with combining marks removed for matching only. Original text preserved. No dependency parser, word alignment or inference of universal grammar rules. Counts overlap.','sourceCounts':dict(Counter(r['source'] for r in rows)),'conflictingRows':sum(r['conflictingTargets'] for r in rows),'englishTokenCount':sum(len(r['english'].split()) for r in rows),'kashmiriWhitespaceTokenCount':sum(len(r['kashmiri'].split()) for r in rows),'uniqueOriginalWhitespaceTokens':len({t for r in rows for t in r['kashmiri'].split()}),'uniqueMarkFoldedArabicTokens':len(vocab),'topFoldedTokens':vocab.most_common(40),'topBigrams':[{'tokens':list(k),'count':v} for k,v in bigrams.most_common(30)],'topTrigrams':[{'tokens':list(k),'count':v} for k,v in trigrams.most_common(20)],'constructionEvidence':evidence,'qualityFlags':{'endsWithoutSentencePunctuation':sum(not re.search(r'[.!?۔؟][\"\u201d\u2019)]?$',r['kashmiri']) for r in rows),'englishGreaterThanDoubleTargetWordCount':sum(len(r['english'].split())>2*len(r['kashmiri'].split()) for r in rows)},'limitations':['Corpus vocabulary is heavily encyclopedic and software-interface language.','Punctuation segmentation can misalign translations despite owner approval.','Raw tokens are not dictionary lemmas, bilingual word meanings or grammatical tags.','No defensible word-order percentages or tense/gender labels can be obtained from these token counts alone.','Apparent alignment issues require review before using examples as authoritative grammar.'],'neuralTrainingPerformed':False}
 OUT.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({k:result[k] for k in ['inputPairs','englishTokenCount','kashmiriWhitespaceTokenCount','uniqueOriginalWhitespaceTokens','conflictingRows','qualityFlags']},indent=2))
 print(json.dumps({k:v['matchingRows'] for k,v in evidence.items()},indent=2))
if __name__=='__main__':build()
