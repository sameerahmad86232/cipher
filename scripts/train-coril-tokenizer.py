"""Download public CorIL splits and train a reproducible Kashmiri BPE tokenizer."""
import json, pathlib, urllib.request, hashlib
from tokenizers import Tokenizer, models, trainers, pre_tokenizers, normalizers

root = pathlib.Path(__file__).resolve().parents[1]
out = root / 'training-data' / 'coril'
out.mkdir(parents=True, exist_ok=True)
base = 'https://huggingface.co/datasets/HimangY/CoRil-Parallel/resolve/1503f07f7262ea39385069aa3e1ba762c867abcb/'
splits = {}
for split in ('train', 'dev', 'test'):
    name = f'HI-KS/GEN/HimangY-Train-Dev-Test-Splits-24072024_HI-KS_GEN_hi_ks_gen_{split}.txt'
    raw = urllib.request.urlopen(base + name, timeout=60).read()
    (out / f'{split}.tsv').write_bytes(raw)
    pairs = [line.split('\t') for line in raw.decode('utf-8-sig').splitlines() if line.strip()]
    if any(len(pair) != 2 for pair in pairs):
        raise ValueError(f'Unexpected columns in {split}')
    splits[split] = pairs
tokenizer = Tokenizer(models.BPE(unk_token='[UNK]'))
tokenizer.normalizer = normalizers.NFC()
tokenizer.pre_tokenizer = pre_tokenizers.Whitespace()
tokenizer.train_from_iterator((p[1] for p in splits['train']), trainers.BpeTrainer(vocab_size=8000, min_frequency=2, special_tokens=['[UNK]', '[PAD]', '[BOS]', '[EOS]']))
tokenizer.save(str(out / 'tokenizer.json'))
evaluation = {}
for split in ('dev', 'test'):
    encoded = [tokenizer.encode(p[1]) for p in splits[split]]
    total = sum(len(e.ids) for e in encoded)
    unknown = sum(e.tokens.count('[UNK]') for e in encoded)
    evaluation[split] = {'sentences': len(encoded), 'tokens': total, 'unknownTokenRate': unknown / total if total else 0}
report = {'model': 'Kashmiri BPE tokenizer', 'vocabularySize': tokenizer.get_vocab_size(), 'source': 'https://huggingface.co/datasets/HimangY/CoRil-Parallel', 'revision': '1503f07f7262ea39385069aa3e1ba762c867abcb', 'license': 'CC-BY-4.0', 'splitCounts': {s: len(p) for s,p in splits.items()}, 'evaluation': evaluation, 'scope': 'Tokenizer training only; the production translation model has not been fine-tuned.'}
(out / 'training-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print(json.dumps(report, ensure_ascii=False))
