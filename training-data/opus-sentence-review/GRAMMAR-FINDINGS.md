# Findings from the 4,208 owner-approved sentence candidates

The analysis scanned every record, preserving original spelling. Counts below use Arabic-script tokens with combining marks removed solely for matching; they overlap and are not parser-verified grammatical labels. See `analysis.json` for exact forms, examples, source IDs, frequencies and input hash. No neural training occurred.

## Composition and constructions

| Construction family | Rows matching listed markers | Practical translation implication |
| --- | ---: | --- |
| Copula/auxiliary forms | 2,692 | Choose person, number, gender, tense and honorific form from context; avoid a fixed translation of English “is/are”. |
| Past auxiliary forms | 464 | Distinguish past state, completed event and ongoing/habitual past. Marker presence alone does not determine tense. |
| منز | 2,277 | Often follows the location noun/pronoun, forming an “in/within” phrase. |
| پؠٹھ / پیٹھ | 827 | Can express surface, starting point or source; do not map it mechanically to only “on”. |
| Genitive form family | 1,257 | Possessive expressions require inflection and agreement; one fixed “his/of” replacement is inadequate. |
| تہ | 2,219 | Coordination joins words, phrases and clauses; preserve parallel structure. |
| Potential relative forms | 827 | Relative and correlative clauses need their own structure; token matches are not proof of a relative clause. |
| Listed negation forms | 141 | Negation can occur separately or attached to an auxiliary; preserve scope. |
| ز / زِ | 225 | Potential clause-linking/complement uses; short tokens can be ambiguous. |
| Listed purpose forms | 48 | Distinguish purpose/benefit from other meanings of English “for”. |

Kashmiri main declaratives commonly place the finite verb in second position, while lexical verbs can occur later. This is consistent with the previously extracted Spoken Kashmiri course; the present token-count analysis does not establish a word-order percentage or justify applying the same order to every subordinate clause or question. Avoid describing the entire language simply as SOV based on English-to-Kashmiri copying.

For example, the source text `بیٚمُیٛن اوس ... منٛز آباد گومُت۔` shows a subject followed by a finite past auxiliary, with a location phrase and predicate later. This illustrates why the finite auxiliary and lexical predicate need separate treatment. It is descriptive evidence, not a complete agreement paradigm.

A practical composition checklist is: identify clause boundaries and meaning; identify subject and semantic agent; select tense/aspect and agreement; inflect noun/pronoun phrases with their postpositions; build relative or complement clauses separately; check negation scope; then verify all names, dates, numbers and content against the English.

## Vocabulary and domain

The English side contains 91,570 whitespace tokens, and the Kashmiri side contains 94,186. There are 23,530 distinct original Kashmiri-side whitespace tokens. These include inflected forms, punctuation, names, numbers and spelling variants: they are **not 23,530 verified dictionary words**. The corpus is primarily encyclopedic and software-interface language; it cannot by itself establish fluent Seerah or Hadith narrative style.

Repeated fragments include `چھ اکھ`, `یہ چھ`, `منز چھ`, `یتھ منز`, and `تہ چھ` after mark folding. These are useful search/review cues, not bilingual lexical alignments. Word meanings must be checked in context rather than inferred from occurrence in the same sentence.

## Quality issues and limits

- 36 rows have conflicting Kashmiri targets for a normalized English input; these remain excluded from eligibility.
- 140 rows have more than twice as many English whitespace tokens as Kashmiri tokens. This is a review signal, not a measured error count or proof of omission.
- 788 Kashmiri segments do not end in the punctuation recognized by the heuristic. Citations, quotes and fragments can explain some cases.
- A clear content mismatch appears among the examples: “He is also the member of parliament (MP) for Gandhinagar.” is paired with `تٔمہ کٔر 2014 پؠٹھٕ 2020 تام بھارتیہ جنتا پارٹی (بی جے پی) ہٗک 10 ہم صدر بننٕچ کٲم۔` The target discusses a BJP role and years rather than the English sentence. Original owner approval is preserved; it does not remove the observed mismatch.
- Equal punctuation-segment counts do not guarantee semantic alignment. Owner approval and independent verification remain separate fields. No 99% accuracy claim is supported.

These findings improve a translation checklist, retrieval hints and review priorities. They do not provide independently validated grammatical rules, a full morphology analyzer, reliable word-level English meanings, or a trained neural model.
