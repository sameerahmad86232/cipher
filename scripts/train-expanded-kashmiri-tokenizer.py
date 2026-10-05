"""Train BPE on CorIL and attributed public text; preserve held-out sentences."""
import collections, hashlib, json, pathlib, re, unicodedata, urllib.request
from tokenizers import Tokenizer, models, trainers, pre_tokenizers, normalizers

root = pathlib.Path(__file__).resolve().parents[1]
out = root / 'training-data' / 'expanded-tokenizer'
out.mkdir(parents=True, exist_ok=True)
def clean(text):
    return ' '.join(unicodedata.normalize('NFC', text).split())
def read_split(split):
    return [clean(line.split('\t')[1]) for line in (root/'training-data/coril'/f'{split}.tsv').read_text().splitlines() if '\t' in line]
heldout = set(read_split('dev') + read_split('test'))
rows, seen, counts = [], set(), collections.Counter()
rejected = collections.Counter()
def add(text, source):
    text = clean(text)
    if text in heldout:
        rejected['heldout_overlap'] += 1
        return
    if text in seen:
        rejected['duplicate'] += 1
        return
    arab = sum('\u0600' <= c <= '\u06ff' for c in text)
    letters = sum(c.isalpha() for c in text)
    if arab < 5 or arab / max(letters,1) < .7 or re.search(r'https?://|#Redirect|%5B',text):
        rejected['script_or_markup'] += 1
        return
    seen.add(text); rows.append(text); counts[source] += 1
for text in read_split('train'):
    add(text, 'CorIL Hindi–Kashmiri / CC BY 4.0')
url = 'https://raw.githubusercontent.com/sinaahmadi/PersoArabicLID/main/datasets/0/train.txt'
raw = urllib.request.urlopen(url, timeout=60).read()
(out/'pali-source.txt').write_bytes(raw)
for line in raw.decode().splitlines():
    if line.startswith('__label__kas\t'):
        add(line.split('\t',1)[1], 'PALI / MIT')
public = json.loads((root/'dist/assets/kashmiri-public-corpus.json').read_text())
for row in public['records']:
    add(row['text'], row['dataset']+' / '+row['license'])
tokenizer = Tokenizer(models.BPE(unk_token='[UNK]'))
tokenizer.normalizer = normalizers.NFC()
tokenizer.pre_tokenizer = pre_tokenizers.Whitespace()
tokenizer.train_from_iterator(rows, trainers.BpeTrainer(vocab_size=12000, min_frequency=2, special_tokens=['[UNK]','[PAD]','[BOS]','[EOS]']))
tokenizer.save(str(out/'tokenizer.json'))
baseline = Tokenizer.from_file(str(root/'training-data/coril/tokenizer.json'))
evaluation = {}
for split in ('dev','test'):
    evaluation[split] = {}
    for name, model in [('previous',baseline),('expanded',tokenizer)]:
        encodings = [model.encode(text) for text in read_split(split)]
        tokens = sum(len(e.ids) for e in encodings)
        evaluation[split][name] = {'sentences':len(encodings),'tokens':tokens,'unknownTokenRate':sum(e.tokens.count('[UNK]') for e in encodings)/tokens}
report = {'scope':'BPE tokenizer training; does not update NLLB translation weights', 'trainingSentences':len(rows), 'vocabularySize':tokenizer.get_vocab_size(), 'sources':dict(counts), 'rejected':dict(rejected), 'trainingHeldoutOverlap':len(seen & heldout), 'developmentTestOverlap':len(set(read_split('dev')) & set(read_split('test'))), 'paliSource':url, 'paliSha256':hashlib.sha256(raw).hexdigest(), 'evaluation':evaluation}
(out/'training-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
(out/'ATTRIBUTION.md').write_text('CorIL: HimangY/CoRil-Parallel, CC BY 4.0.\nPALI: Sina Ahmadi, PersoArabicLID, MIT.\nAdditional text: attributed per-record public corpus, Kashmiri Wikipedia CC BY-SA 4.0 and OpenSLR 122 GPL-3.0-or-later. Retain original terms for redistribution.\n')
print(json.dumps(report,ensure_ascii=False))
