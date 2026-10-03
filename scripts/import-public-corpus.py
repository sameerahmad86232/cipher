#!/usr/bin/env python3
"""Import the licensed subsets of Nawab's public Kashmiri corpus.

The composite corpus includes sources with incompatible or unclear terms. We only
copy rows whose original source has a clear public license: Kashmiri Wikipedia
(CC BY-SA 4.0) and OpenSLR 122 (GPL-3.0-or-later). The output keeps source and
license metadata on every sentence and vocabulary reference.
"""
import csv, json, urllib.request
from pathlib import Path

URL = 'https://huggingface.co/datasets/nawabhussain/Kashmiri-Language-Corpus/resolve/main/Kashmiri-Language-Corpus.csv?download=true'
SOURCE_META = {
    'https://ks.wikipedia.org': {
        'dataset': 'Kashmiri Wikipedia', 'license': 'CC BY-SA 4.0',
        'url': 'https://ks.wikipedia.org/'
    },
    'https://openslr.org/122/': {
        'dataset': 'OpenSLR 122 Kashmiri speech corpus', 'license': 'GPL-3.0-or-later',
        'url': 'https://openslr.org/122/'
    },
}
root = Path(__file__).resolve().parents[1]
tmp = root / 'source-ocr' / 'Kashmiri-Language-Corpus.csv'
tmp.parent.mkdir(exist_ok=True)
if not tmp.exists():
    urllib.request.urlretrieve(URL, tmp)
rows, seen = [], set()
with tmp.open(encoding='utf-8', newline='') as fh:
    for row in csv.DictReader(fh):
        sentence = ' '.join((row.get('sentence') or '').split())
        meta = SOURCE_META.get(row.get('source') or '')
        if not sentence or not meta or sentence in seen:
            continue
        seen.add(sentence)
        rows.append({'text': sentence, 'source': meta['url'], 'dataset': meta['dataset'], 'license': meta['license']})
rows.sort(key=lambda row: (row['dataset'], row['text']))
out = {
    'title': 'Licensed Kashmiri public corpus subset',
    'description': 'Sentence-level reading corpus filtered from Nawab’s Apache-labelled composite corpus. Rows from the composite sources with unclear or gated terms are excluded.',
    'source': 'https://huggingface.co/datasets/nawabhussain/Kashmiri-Language-Corpus',
    'license': 'Per-record; see each record',
    'records': rows,
    'counts': {meta['dataset']: sum(row['dataset'] == meta['dataset'] for row in rows) for meta in SOURCE_META.values()},
}
out_path = root / 'dist' / 'assets' / 'kashmiri-public-corpus.json'
out_path.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')) + '\n')
print(json.dumps({'records': len(rows), 'counts': out['counts'], 'path': str(out_path)}))
