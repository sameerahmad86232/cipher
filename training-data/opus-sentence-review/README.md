# Additional sentence-level review candidates

These are smaller sentence-level candidates extracted from existing OPUS silver training paragraphs. They are not independent newly collected translations or AI-generated translations. The project owner subsequently approved this 4,208-pair batch; this is not independent linguistic validation.

Only paragraphs with equal counts of English and Kashmiri punctuation segments are considered. Short fragments, long segments, markup and highly disproportionate lengths are filtered. Existing JSONL English inputs and evaluation paragraph segments are blocked. Different targets for the same English input are flagged. Original spelling is preserved.

Equal counts do not prove alignment: abbreviations, translated sentence merging and punctuation errors can produce incorrect matches. Every candidate preserves both full parent paragraphs, source line, version, segment position and original license so a reviewer can check meaning in context. `alignmentVerified` remains false because independent verification was not performed. The owner approval is stored in `owner-review.json`, tied to each exact English/Kashmiri content hash so later edits cannot inherit approval silently. `approved-pairs.jsonl` exports owner-approved records. Only owner-approved, nonconflicting rows are marked `trainingEligible`, subject to original license obligations.

Use `review.xlsx` to inspect or correct the approved batch. The workbook reflects approval status. Approval applies to this 4,208-pair collection only, not the separate 478 additional alignments. No automatic training import or neural training occurred. Wikimedia-derived rows remain CC BY-SA 4.0 and translatewiki rows CC BY 3.0, following the existing source attribution in `../opus-en-ks/ATTRIBUTION.md`. Preserve source attribution and applicable share-alike requirements.

Rebuild: `python scripts/extract-opus-sentence-candidates.py`.
Validate: `python scripts/test-opus-sentence-candidates.py`.

Other sources checked: OPUS Ubuntu and GNOME samples primarily use Devanagari and include apparent Hindi content; excluded from this Perso-Arabic review set rather than automatically transliterated.
