# Approved OPUS CPU neural diagnostic

This folder contains an actual trained character-level GRU encoder/decoder and its reproducible training report. It is a small model trained from scratch on CPU, not NLLB/IndicTrans fine-tuning and not an update to ChatGPT's weights.

`model.pt` stores model parameters, architecture and training-only character vocabulary. `split.json` records exact input IDs and exclusion reasons. `report.json` records initial and subsequent validation loss, parameter count, runtime and generated samples. PyTorch CPU is required to reproduce the run.

Run `python scripts/train-approved-opus-cpu.py`, then `python scripts/test-approved-opus-cpu.py`.

Training uses eligible owner-approved nonconflicting pairs, excludes the known Gandhinagar mismatch and heuristic possible omissions, and excludes examples longer than 254 characters per side rather than truncating them. Train and validation are separated by source paragraph, so sibling segments cannot cross splits. The vocabulary is fitted only on training text. These exclusions do not remove the source records or revoke owner approval.

Three epochs, batch size 32, seed 42, 64-dimensional embeddings, 128-dimensional GRU hidden state, AdamW learning rate 0.001. Character losses are token-weighted. Validation is a held-out subset of the same collection, not an independent quality benchmark. The architecture has no attention and is deliberately small; poor generated translations are expected from this limited scratch-training diagnostic. Do not deploy this checkpoint as the website translator.

The training data retains OPUS translatewiki CC BY 3.0 and Wikimedia CC BY-SA 4.0 attribution and applicable obligations; see `../opus-en-ks/ATTRIBUTION.md` and `../opus-sentence-review/approved-pairs.jsonl`. No independent permissive license for the checkpoint or accuracy guarantee is asserted.

Observed result: the three held-out sample inputs all generated the same repetitive text. This run failed the generation check. Reduced validation loss does not justify deployment or claim a useful translator improvement. A suitable pretrained translation model and stronger alignment review are needed for the next substantive training run.
