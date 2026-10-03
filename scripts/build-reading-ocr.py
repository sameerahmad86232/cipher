#!/usr/bin/env python3
import html,json,pathlib,unicodedata
import xml.etree.ElementTree as ET
ROOT=pathlib.Path('/workspace'); base=ROOT/'source-ocr/reading'; out=ROOT/'dist/assets/kashmiri-reading-ocr.json'; txt=ROOT/'dist/assets/kashmiri-reading-ocr.txt'
items=[
 ('dli.ernet.504533','kashur-grammer','Kashur Grammer','Naji Munwar and Shafi Shoque','Grammar','https://archive.org/details/dli.ernet.504533'),
 ('dli.ernet.510105','kaishrik-grammer','Kaishrik Grammer','Shok Shafiq','Grammar','https://archive.org/details/dli.ernet.510105'),
 ('8thkashmiritextbook','jkbose-class-8','Kashmiri Textbook for 8th Standard','JKBOSE','Textbook','https://archive.org/details/8thkashmiritextbook'),
 ('book-v-85-shrimad-bhagvad-geeta-kashmiri-translation-1933-pandit-krishna-joo-dhar','gita-kashmiri-translation','Shrimad Bhagavad Gita · Kashmiri translation (1933)','Pandit Krishna Joo Dhar','Translation','https://archive.org/details/book-v-85-shrimad-bhagvad-geeta-kashmiri-translation-1933-pandit-krishna-joo-dhar'),
 ('book-v-87-othello-kashmiri-translation-ghulam-nazir','othello-kashmiri-translation','Othello · Kashmiri translation','Ghulam Nazir','Translation','https://archive.org/details/book-v-87-othello-kashmiri-translation-ghulam-nazir'),
 ('rAxf_raja-tarangini-kashmiri-translation-vol.-1-jk-culture-academy','raja-tarangini-kashmiri-translation','Raja Tarangini · Kashmiri translation, volume 1','Jammu and Kashmir Culture Academy','Translation','https://archive.org/details/rAxf_raja-tarangini-kashmiri-translation-vol.-1-jk-culture-academy'),
 ('JeYD_lole-gita-kashmiri-translation-mahishar-nath-raina','lole-gita-kashmiri-translation','Lole Gita · Kashmiri translation','Mahishar Nath Raina','Translation','https://archive.org/details/JeYD_lole-gita-kashmiri-translation-mahishar-nath-raina'),
 ('book-v-96-sumran-kashmiri-hindu-poetry-with-english-translation-lale-rukh-press','sumran-kashmiri-poetry','Sumran · Kashmiri Hindu poetry with English translation','Lale Rukh Press','Translation and poetry','https://archive.org/details/book-v-96-sumran-kashmiri-hindu-poetry-with-english-translation-lale-rukh-press'),
 ('in.ernet.dli.2015.24175','grierson-dictionary-ocr','A Dictionary of the Kashmiri Language (Grierson, 1932)','George A. Grierson','Reference dictionary','https://archive.org/details/in.ernet.dli.2015.24175'),
 ('dli.language.2243','koul-dli-ocr','Kashmiri-English Dictionary for Second Language Learners','Omkar N. Koul, Roop Krishen Bhat and S. N. Raina','Reference dictionary','https://archive.org/details/dli.language.2243'),
]
books=[]; pages=[]; text=[]
for iaid,bid,title,creator,category,source in items:
 p=base/(iaid+'.xml'); tree=ET.parse(p); objs=tree.findall('.//OBJECT')
 book={'id':bid,'title':title,'creator':creator,'category':category,'source':source,'pages':len(objs),'license': ('Archive metadata reports public domain; DSAL carries different dictionary terms; source-linked OCR for review' if bid == 'grierson-dictionary-ocr' else 'CC BY-NC 4.0 (Internet Archive metadata); source-linked OCR for reading and review' if bid == 'koul-dli-ocr' else 'Archive metadata does not state a reuse license; source-linked OCR for reading and review')}; books.append(book)
 for n,obj in enumerate(objs,1):
  lines=[]
  for line in obj.findall('.//LINE'):
   words=[]
   for w in line.findall('.//WORD'):
    v=html.unescape(w.text or '').replace('\u200e','').replace('\u200f','').replace('\ufeff','').strip()
    if v: words.append(v)
   if words: lines.append(' '.join(words))
  raw=unicodedata.normalize('NFC','\n'.join(lines)).strip(); pages.append({'book':bid,'page':n,'text':raw}); text.append(f'\n===== {title} · PDF page {n} =====\n\n{raw}\n')
payload={'title':'Kashmiri reading library · grammar, textbooks and translations OCR','language':'Kashmiri','script':'Perso-Arabic','books':books,'pages':pages,'source':'Internet Archive scans listed in the Koshur Lughat reading library','permission':'Archive metadata does not state a reuse license for these records. Preserve source links and verify rights before redistribution or publication of extracted text.','method':'Internet Archive DjVu XML OCR, page-preserving; machine output requires review.','normalization':'Raw text is preserved; the site derives a conservative normalized view and transliteration for reading support.'}
out.write_text(json.dumps(payload,ensure_ascii=False,separators=(',',':'))+'\n'); txt.write_text(''.join(text)); print(json.dumps({'books':len(books),'pages':len(pages),'characters':sum(len(p['text']) for p in pages),'output':str(out)}))
