# Kashmiri neural training manifest

The neural model is trained outside this repository because this workspace has no CUDA GPU or PyTorch installation.

## Data tiers

- `approved-parallel.jsonl`: native-speaker-approved gold corrections. Use for final low-rate corrective fine-tuning and manual evaluation; never silently mix held-out diagnostics into training.
- `combined-parallel.jsonl`: source-attested examples plus approved corrections. Useful for reproducible small experiments.
- BPCC `bpcc-seed-latest/kas_Arab.tsv`: gated broad-domain English–Kashmiri training source. Download only after accepting the publisher's terms; do not commit it here.
- `user-reviewed-heldout-grammar.json`: diagnostic sentences. Keep out of training.

## Recommended stages

1. Broad LoRA training on BPCC with fixed deterministic train/evaluation splits.
2. Evaluate on held-out BPCC and separately on native-speaker diagnostics.
3. Corrective LoRA continuation on `approved-parallel.jsonl` at a lower learning rate.
4. Record chrF/BLEU and native-speaker error labels for meaning, tense, agreement, spelling and fluency.
5. Deploy only a version whose adapter, base-model revision, tokenizer, data manifest and evaluation report are all preserved.

Books, OCR output, dictionaries and monolingual corpora are not parallel translation pairs. They can support spelling, tokenization and language modeling, but must not be presented as English–Kashmiri neural training data without alignment and review.
