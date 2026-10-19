# Kashmiri grammar evidence from parallel sentences

Generated from 71 owner-approved pairs and 8,416 OPUS silver pairs by
`python scripts/analyze-parallel-grammar.py`. Exact counts and examples are in
`parallel-grammar-evidence.json`. These counts show attested forms, **not** a
complete grammar or proof that every OPUS translation is correct.

## Patterns to preserve in translation

1. **Present or habitual predicates vary by subject.** The reviewed pairs
   contrast `بہٕ چھُس ... پَران` (“I read ... regularly”),
   `سۄ چھےٚ ... پَران` (“She reads ... regularly”), and
   `اَسۍ چھِ ... گَژھان` (“We go ... every day”). Do not flatten these
   auxiliaries to one form.
2. **Past completed actions have different shapes.** Reviewed examples include
   `مےٚ پٔر راتھ کِتاب` (“I read a book yesterday”),
   `مےٚ لیوٚکھ خَط راتھ` (“I wrote a letter yesterday”), and
   `تٔمۍ پٔر راتھ کِتاب` (“She read a book yesterday”). English “read” is
   tense-ambiguous without context; markers like “yesterday” matter.
3. **Postpositions follow their complement.** The reviewed `سَرَس پؠٹھ`
   (“on the lake”) and `وانَس پؠٹھ` (“at the store”) demonstrate this.
   Location/postposition forms were found in 24 approved pairs and 4,822 OPUS
   silver pairs; the latter count is descriptive only.
4. **Negation and possession need construction-level checks.** A reviewed
   example is `مےٚ روٗد نٕہ تٔمؠ سُنٛد ناو وَنہِ` (“I couldn’t remember his
   name”). A word-for-word English order would miss the local structure.
5. **Relative clauses may link a relative and a correlative.** The approved
   Hadith prose contains `یُس ... سُہ ...`. The script detects a relative
   marker in 15 approved pairs and 1,111 OPUS pairs; it does not verify that
   each clause is well formed.

## Limits

- OPUS silver text has variable orthography, topics and quality. The exact
  form detector misses spelling variants and cannot infer syntactic roles.
- The approved set is small and includes long religious passages. It is not a
  balanced sample of spoken or literary Kashmiri.
- These findings should prompt review of model output, not silently rewrite it.
- No model was fine-tuned by this analysis; no new grammar accuracy percentage
  is established.
