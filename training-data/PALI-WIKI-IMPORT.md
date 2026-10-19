# Additional PALI Kashmiri text

`pali-wiki-monolingual.jsonl` contains 933 new, automatically filtered
Perso-Arabic Kashmiri lines from the PALI repository's
`corpora/Kashmiri_ks-wiki-20221201.txt` at commit
`79a3ee702c699452574e6a24c4835a3729edd2d1`. The original file was
downloaded to ignored `source-datasets/pali/` and had 6,341 lines. Exact
matches against `assets/kashmiri-public-corpus.json` and obvious fragments,
markup, non-Arabic text and long lines were excluded.

PALI code is marked MIT, but these lines derive from Kashmiri Wikipedia;
the text is treated as **CC BY-SA 4.0** with source attribution. The rows are
unreviewed monolingual text. They are used only to count attested language
patterns, **not** as English–Kashmiri pairs or live dictionary definitions.

The set is topic-skewed: many lines concern actors and films. Frequencies
should not be interpreted as a balanced picture of Kashmiri grammar.

Regenerate with `python scripts/import-pali-wiki-monolingual.py`, then
`python scripts/analyze-parallel-grammar.py`.
