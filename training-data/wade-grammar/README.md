# Wade 1888 Kashmiri grammar extraction

This package converts the numbered descriptions in T. R. Wade's *A Grammar of the Kashmiri Language as Spoken in the Valley of Kashmir* (originally published in 1888) into traceable records.

The attached PDF is a 1995 reprint of the historical text. This repository does not redistribute the PDF. The factual grammar descriptions are attributed to the 1888 work; extracted text must still be checked against the scan.

## Files

- `rules.jsonl`: a complete 1–319 numbered-section index with physical PDF page provenance. Sections the OCR could not reliably locate are explicit null-text placeholders.
- `instruction-candidates.jsonl`: question/answer candidates derived only from sections with extracted text.
- `chapters.json`: chapter coverage and rule ranges.
- `extraction-report.json`: OCR coverage and safety policy.

## Critical training policy

These records are **not gold modern Kashmiri training data**. The book uses nineteenth-century Roman transliteration plus Devanagari and Sharada, contains OCR errors, describes dialect variation, and predates modern standardized Perso-Arabic orthography. Every record has `trainingEligible: false` until a modern Kashmiri reviewer validates and, where needed, rewrites it in modern Perso-Arabic Kashmiri.

The data can safely support historical grammar research, rule discovery, and preparation of review tasks. It must not be mixed directly into neural English–Kashmiri parallel training.

The current automated pass recovered text for 299 of 319 numbered sections. The remaining 20 records are marked `ocr-missing-needs-manual-transcription`; they are not silently guessed.
