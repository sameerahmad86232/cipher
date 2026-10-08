# Quality-first English → Kashmiri training

The Hadith 27–50 drafts exposed a serious quality gap. They must not be used as training targets.

## Verified inputs

- 71 owner-approved general sentence pairs.
- 26 owner-reviewed Hadith passages.
- CoRIL 21,103 Hindi–Kashmiri pairs (CC BY 4.0), used only as an auxiliary Kashmiri-generation task.
- Optional BPCC English–Kashmiri pairs after the user accepts the gated publisher terms.

## Excluded from gold training

- Hadiths 27–50 and every other unreviewed translation draft.
- OCR text and Wade's historical romanized grammar extracts.
- Dictionary headword glosses presented as if they were sentences.
- Synthetic million-pair corpora without native-speaker evaluation.
- CoRIL development and test splits.

## Training sequence

1. Broad multilingual LoRA training: BPCC when available, CoRIL as an auxiliary Hindi→Kashmiri task, and approved pairs oversampled.
2. Corrective English→Kashmiri tuning on owner-approved pairs only, at a lower learning rate.
3. Evaluation on untouched owner-reviewed sentences and BPCC validation data.
4. Human review for meaning, negation, tense/aspect, case/agreement, honorific language, fluency and orthography.
5. Deployment only if it materially beats the current model and does not regress on approved religious terminology.

The executable pipeline is `scripts/finetune-nllb-quality-staged.py`. It refuses to pretend training occurred when CUDA is unavailable.
