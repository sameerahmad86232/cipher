# Additional sentence-level review candidates

These are smaller sentence-level candidates extracted from existing OPUS silver training paragraphs. They are not independent newly collected translations, AI-generated translations, or native-speaker-approved pairs.

Only paragraphs with equal counts of English and Kashmiri punctuation segments are considered. Short fragments, long segments, markup and highly disproportionate lengths are filtered. Existing JSONL English inputs and evaluation paragraph segments are blocked. Different targets for the same English input are flagged. Original spelling is preserved.

Equal counts do not prove alignment: abbreviations, translated sentence merging and punctuation errors can produce incorrect matches. Every candidate preserves both full parent paragraphs, source line, version, segment position and original license so a reviewer can check meaning in context. `trainingEligible` and `alignmentVerified` remain false for every row.

Use `review.xlsx` to approve, reject or correct candidates. No automatic training import or neural training occurred. Wikimedia-derived rows remain CC BY-SA 4.0 and translatewiki rows CC BY 3.0, following the existing source attribution in `../opus-en-ks/ATTRIBUTION.md`. Preserve source attribution and applicable share-alike requirements.

Rebuild: `python scripts/extract-opus-sentence-candidates.py`.
Validate: `python scripts/test-opus-sentence-candidates.py`.

Other sources checked: OPUS Ubuntu and GNOME samples primarily use Devanagari and include apparent Hindi content; excluded from this Perso-Arabic review set rather than automatically transliterated.
