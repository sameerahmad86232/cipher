#!/usr/bin/env python3
"""Build page-preserving OCR search data from Internet Archive DjVu XML derivatives."""
import html, json, pathlib, re, unicodedata
import xml.etree.ElementTree as ET

ROOT = pathlib.Path('/workspace')
OUT = ROOT / 'dist/assets/kashir-dictionary-ocr.json'
TXT = ROOT / 'dist/assets/kashir-dictionary-ocr.txt'
BOOKS = [
 ('v1.xml','kashir-dictionary-v1','Kashir Dictionary, Volume 1','Tousikhani S. K., J. Lal Koul, Hajni Mohi-ud-din, P. N. Puship and Akhter Mohi-ud-din','in.ernet.dli.2015.510168'),
 ('v2.xml','kashir-dictionary-v2','Kashir Dictionary, Volume 2','Tousikhani S. K., J. Lal Koul, Hajni Mohi-ud-din, P. N. Puship and Akhter Mohi-ud-din','in.ernet.dli.2015.510170'),
 ('v3.xml','kashir-dictionary-v3','Kashir Dictionary, Volume 3','Tousikhani S. K., J. Lal Koul, Hajni Mohi-ud-din, P. N. Puship and Akhter Mohi-ud-din','dli.ernet.241981'),
 ('v4.xml','kashir-dictionary-v4','Kashir Dictionary, Volume 4','Tousikhani S. K., J. Lal Koul, Hajni Mohi-ud-din, P. N. Puship and Akhter Mohi-ud-din','dli.ernet.241982'),
 ('v5.xml','kashir-dictionary-v5','Kashir Dictionary, Volume 5','Tousikhani S. K., J. Lal Koul, Hajni Mohi-ud-din, P. N. Puship and Akhter Mohi-ud-din','dli.ernet.241983'),
 ('v6.xml','kashir-dictionary-v6','Kashir Dictionary, Volume 6','Tousikhani S. K., J. Lal Koul, Hajni Mohi-ud-din, P. N. Puship and Akhter Mohi-ud-din','in.ernet.dli.2015.241984'),
 ('v7.xml','kashir-dictionary-v7','Kashir Dictionary, Volume 7','Tousikhani S. K., J. Lal Koul, Hajni Mohi-ud-din, P. N. Puship and Akhter Mohi-ud-din','in.ernet.dli.2015.510171'),
]
base = ROOT / 'source-ocr/kashir'
books=[]; pages=[]; text_parts=[]
for filename, bid, title, creator, iaid in BOOKS:
    tree = ET.parse(base / filename)
    objs = tree.findall('.//OBJECT')
    source = f'https://archive.org/details/{iaid}'
    book = {'id':bid,'title':title,'creator':creator,'source':source,
            'license':'Archive metadata does not specify a reuse license; source-linked OCR for research and review',
            'pages':len(objs)}
    books.append(book)
    for n,obj in enumerate(objs, 1):
        lines=[]
        for line in obj.findall('.//LINE'):
            words=[]
            for w in line.findall('.//WORD'):
                value=html.unescape(w.text or '').replace('\u200e','').replace('\u200f','').replace('\ufeff','').strip()
                if value: words.append(value)
            if words: lines.append(' '.join(words))
        raw=unicodedata.normalize('NFC','\n'.join(lines)).strip()
        page={'book':bid,'grade':'Reference dictionary','page':n,'text':raw}
        pages.append(page)
        text_parts.append(f'\n===== {title} · PDF page {n} =====\n\n{raw}\n')
payload={'title':'Kashir Dictionary (seven-volume series) · page OCR','language':'Kashmiri','script':'Perso-Arabic',
         'books':books,'pages':pages,
         'source':'Internet Archive scans from Digital Library of India records',
         'permission':'No reuse license is stated in the archive metadata. This page OCR is retained as a source-linked research layer; verify rights before redistribution of scans or extracted definitions.',
         'method':'Internet Archive DjVu XML OCR, preserving raw page text. OCR errors and script recognition errors are expected; no unreviewed text is presented as an English definition.',
         'normalization':'Raw text is preserved. The site derives a conservative NFC/orthography-normalized view and transliteration for lookup context.'}
OUT.write_text(json.dumps(payload,ensure_ascii=False,separators=(',',':'))+'\n')
TXT.write_text(''.join(text_parts))
print(json.dumps({'books':len(books),'pages':len(pages),'characters':sum(len(p['text']) for p in pages),'output':str(OUT)}))
