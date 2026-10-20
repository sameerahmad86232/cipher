# Spoken Kashmiri: A Language Course — extraction notes

Source: [Omkar N. Koul, *Spoken Kashmiri: A Language Course*](https://archive.org/details/dli.language.0846).
The Archive record dates the work to 1987. The PDF copyright page identifies
the first publication as 1987 and this second edition as 2005, published by the
Indian Institute of Language Studies, ISBN 81-86323-19-8.

The 134-page PDF includes an added cover followed by printed pages 1–133.
The text is English with Roman/phonetic Kashmiri transcription. It is not a
Perso-Arabic Kashmiri edition. The contents list 20 lessons, an appendix of
classified vocabulary on printed pages 118–132, and references on page 133.

The Archive metadata reports CC BY-NC 4.0; the copyright page names the
author. Preserve attribution and keep the extracted book out of commercially
intended training unless the necessary separate permission is established.
The raw book and OCR outputs are provided privately to the user; this repository
keeps the extraction tool, metadata, and source-linked analytical notes.

## What the course teaches

The following is a paraphrased topic index, not a verified complete grammar or
an instruction to apply each suffix without checking the source examples.
Page ranges below are printed pages; add one for the PDF page number.

| Lesson | Grammar-note pages | Main topics |
| --- | --- | --- |
| 1 | 13–16 | Demonstratives, copula agreement, gender, plural formation and sentence order |
| 2 | 20–22 | Questions about animate subjects, yes/no question forms, and negation |
| 3 | 25–27 | Cardinal numerals, inflected and uninflected adjectives, and “how many” |
| 4 | 30–31 | Possessive pronouns and agreement with the possessed noun |
| 5 | 35–36 | Possessive forms derived from nouns |
| 6 | 40–41 | Personal pronouns and present copula forms, including honorific usage |
| 7 | 44–46 | Verb roots, infinitives, and present/past progressive constructions |
| 8 | 50–51 | Habitual constructions, auxiliary selection, and expressions of place/time |
| 9 | 56–58 | Imperatives, honorific/plural commands, and negative commands |
| 10 | 62–64 | Dative pronouns and noun forms, possession, and postpositions |
| 11 | 68–70 | Future/presumptive auxiliaries and person/number agreement |
| 12 | 75–77 | Simple past: contrasting intransitive and transitive constructions |
| 13 | 81 | Infinitive constructions involving dative subjects |
| 14 | 86–87 | Present and past perfect with intransitive predicates |
| 15 | 91–93 | Perfect constructions with transitive predicates and ergative agreement |
| 16 | 97 | Ability constructions using the modal hekun |
| 17 | 102 | Other modal constructions with infinitives |
| 18 | 106–107 | Comparatives, superlatives, and agreeing “how much” forms |
| 19 | 112 | First and second causative constructions |
| 20 | 117 | Relative–correlative clause constructions |

Especially useful for translation review:

- Main-clause finite-verb position must be distinguished from the position of
  the lexical verb; the book explicitly discusses second-position verbs.
- Gender, number and honorific use affect copulas, pronouns and some adjectives.
- Possessives agree with the possessed noun; one English possessive cannot
  always be replaced by one fixed Kashmiri word.
- The past/perfect form depends on transitivity, case and agreement, so English
  tense labels alone are insufficient.
- Postpositions interact with the forms of the noun phrase they follow.
- Commands, ability, obligation, comparisons and relative clauses need their
  own constructions rather than word-for-word English substitution.

## Other material extracted

The full text includes transcription/pronunciation tables, introductory
discussion of dialects and writing systems, dialogues, substitution drills,
transformation/repetition drills, response drills, fill-in-the-blank and other
exercises, lesson vocabulary, classified appendix vocabulary, numbers, and
bibliographic references.

Appendix categories include body parts; clothing and ornaments; metals and
minerals; animals, birds and insects; flowers; vegetables; fruit; food and
spices; household objects; nature, time and seasons; occupations; relationships;
days; months; pronouns; adjectives; numbers; verbs; adverbs; conjunctions; and
postpositions.

## OCR and alignment findings

- All pages have been processed with Tesseract 5.5.0, English traineddata,
  automatic page segmentation (PSM 3), at 300 DPI. The independent Archive OCR
  and the embedded PDF text are also retained separately.
- Embedded custom-font characters can extract as `?`, `0`, ligatures or private
  glyphs instead of their intended phonetic symbols. English OCR also loses
  some phonetic distinctions. Neither representation is safe as phonetic gold.
- The book explains that its English versions convey the general meaning and
  are not necessarily structurally or stylistically one-to-one translations.
- Same-baseline English/Roman candidates may be line fragments. They require
  checking against the page before being promoted to sentence pairs.
- Printed page 128 repeats the numeral label 21 where the second occurrence
  would be expected to be 22. Preserve the source and record any correction.
- The introduction includes dated demographic information and an apparent
  census placeholder. Do not treat it as a current statistical reference.

## Reproduce

Download the PDF, `dli.language.0846_djvu.xml`, and Archive metadata into an
explicit source directory, named `book.pdf`, `archive-ocr.xml`, and
`metadata.json` respectively. With PyMuPDF, openpyxl, Tesseract and its English
traineddata installed:

```bash
python scripts/extract-spoken-kashmiri-course.py /path/to/source /path/to/extracted
python scripts/test-spoken-kashmiri-extraction.py /path/to/extracted
```

The output contains full text in three variants; page JSONL; heading, grammar,
vocabulary, numeral and alignment candidates; a token inventory; a lesson
index; and a review workbook. Original page references are retained. No
Perso-Arabic conversion, gold corpus import or model training is performed.
