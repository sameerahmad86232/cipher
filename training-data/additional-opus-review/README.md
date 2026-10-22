# Additional English–Kashmiri alignment candidates

Collected from the public OPUS Wikimedia and translatewiki archives linked in each record. These are additional alignments outside the project's existing English-key inventory, not newly human-approved translations. Original archives are cached outside Git under `/workspace/library-files/opus-additional`.

The earlier importer required Kashmiri-specific marks. This separate review collection also accepts unvowelled Perso-Arabic text; consequently Urdu, poor spelling, incomplete translations, or wrong alignments may occur. Arabic script does not establish Kashmiri language identity. All records remain `trainingEligible=false` and `languageVerified=false`.

`review.xlsx` provides English, original Kashmiri, blank correction fields, review decisions and source attribution. `candidates.jsonl` retains source version and line references. Conflicting targets are flagged, not silently preferred. Existing JSONL English inputs and the held-out grammar diagnostics are excluded.

Wikimedia rows carry CC BY-SA 4.0; translatewiki rows carry CC BY 3.0 as documented in the existing OPUS attribution files. Preserve applicable attribution and share-alike terms. Corpus labels do not guarantee all upstream content rights. See `../opus-en-ks/ATTRIBUTION.md`.

The Qamar dataset was checked on 2026-10-22: its metadata lists manual gating and CC BY-NC-SA 4.0, and its README request returned HTTP 401. It was not downloaded or included.

Reproduce with `python scripts/collect-additional-opus-pairs.py` (Python with openpyxl). No model download, neural training or automatic website import occurs.
