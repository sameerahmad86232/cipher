import React from 'react';

interface LanguageGuideViewProps {
  onBackToDictionary: () => void;
  onGoToOrthography: () => void;
}

export const LanguageGuideView: React.FC<LanguageGuideViewProps> = ({
  onBackToDictionary,
  onGoToOrthography
}) => {
  return (
    <div className="guide-wrapper">
      <main className="guide-main">
        <header>
          <p className="eyebrow">LANGUAGE · GRAMMAR · PROOFREADING</p>
          <h1>A working grammar for Kashmiri.</h1>
          <p className="lede">
            A practical scheme for reading, writing, checking and teaching modern Kashmiri in the Perso-Arabic script. It brings the writing system, sound patterns, word structure, sentence structure and proofreading decisions into one place.
          </p>
          <p className="guide-note">
            <strong>How to use this guide.</strong> This is a careful working reference, not a claim that every Kashmiri speaker uses one identical form. Kashmiri has regional, social and script traditions. The examples and orthography rules are tied to the sources listed at the end; uncertain grammar should be checked with a fluent speaker before publication.
          </p>
        </header>

        <nav className="guide-toc" aria-label="Guide sections">
          <strong>On this page</strong>
          <a href="#scope">Scope and conventions</a>
          <a href="#script">Script and spelling</a>
          <a href="#sounds">Sounds and transliteration</a>
          <a href="#words">How words are built</a>
          <a href="#nouns">Nouns, pronouns and cases</a>
          <a href="#sentences">Sentences and word order</a>
          <a href="#verbs">Verbs and agreement</a>
          <a href="#negation">Negation and questions</a>
          <a href="#proofreading">Proofreading scheme</a>
          <a href="#machine">How the translator applies it</a>
          <a href="#templates">Writing templates</a>
          <a href="#sources">Sources and limits</a>
        </nav>

        <article className="guide-content">
          <section id="scope">
            <h2>1. Scope and conventions</h2>
            <p>
              <strong>Kashmiri</strong>, or <span lang="ks-Arab" dir="rtl">کٲشُر</span>, is an Indo-Aryan language of the Dardic group. This guide is for modern Kashmiri written in the Perso-Arabic Nastaliq tradition. Kashmiri is also written in Devanagari; the language is the same, but the character, direction and spelling rules differ.
            </p>
            <p>
              Use the language tag <code>ks</code> for Kashmiri, <code>ks-Arab</code> for Perso-Arabic Kashmiri and <code>ks-Deva</code> for Devanagari Kashmiri. Use right-to-left direction for the Arabic script. Keep Kashmiri text, English glosses and transliteration in separate fields so a reader can tell what is original and what is an aid.
            </p>
            <p>
              The guide uses these labels: <strong>word</strong> means a dictionary headword; <strong>form</strong> means an inflection or spelling variant; <strong>gloss</strong> means a short English meaning; <strong>transliteration</strong> means a pronunciation-oriented Latin rendering; <strong>proofreading</strong> means checking an already written sentence, not inventing a translation.
            </p>
          </section>

          <section id="script">
            <h2>2. Script and spelling</h2>
            <h3>Direction, shape and Unicode</h3>
            <p>
              Kashmiri Arabic text runs right to left and is normally displayed in Nastaliq. Letters join in context, so the visible shape is not a separate character. Store ordinary Unicode letters and combining marks, never screenshots, presentation forms or manually drawn glyphs. Normalize text to NFC before comparison. Do not insert tatweel merely to make a word look longer.
            </p>
            <p>
              The modern orthography is unusually vowel-explicit for an Arabic-derived script. Vowel sounds are represented with letters and combining marks, and vowel marks should not be removed from a carefully edited Kashmiri text. A word that looks understandable after the marks are deleted may still become ambiguous or non-standard.
            </p>

            <h3>Core inventory</h3>
            <p>
              The orthography reference describes 21 basic consonant letters, six aspirated consonant digraphs and additional letters used for Persian, Arabic and Urdu loans. Palatalisation has a dedicated Kashmiri sign. Word-initial vowels use a carrier; medial and final vowels can use different Unicode sequences. Follow the character tables in the{' '}
              <button
                type="button"
                className="orthography-nav"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                onClick={onGoToOrthography}
              >
                orthography reference
              </button>{' '}
              when choosing a code point.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Editing decision</th>
                  <th>Preferred practice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kashmiri kaf</td>
                  <td>Use <span lang="ks-Arab">ک</span>. The normalizer accepts Arabic <span lang="ks-Arab">ك</span> as an input variant, but published Kashmiri should use the preferred form.</td>
                </tr>
                <tr>
                  <td>Kashmiri yeh</td>
                  <td>Use the Kashmiri spelling and marks from the word’s source. Do not replace every <span lang="ks-Arab">ی</span>, <span lang="ks-Arab">ي</span> or <span lang="ks-Arab">ى</span> by eye without checking the word.</td>
                </tr>
                <tr>
                  <td>Heh and heh variants</td>
                  <td>Use <span lang="ks-Arab">ہ</span> in Kashmiri forms where the orthography calls for it. Arabic <span lang="ks-Arab">ه</span> and <span lang="ks-Arab">ة</span> are accepted OCR/input variants, not an excuse to erase a meaningful spelling distinction.</td>
                </tr>
                <tr>
                  <td>Zero-width characters</td>
                  <td>Remove accidental zero-width spaces and BOM characters. Preserve a joining control only when the orthography record or a native source requires it.</td>
                </tr>
                <tr>
                  <td>Numbers and punctuation</td>
                  <td>Use Kashmiri/Arabic-Indic digits where the document style requires them. Use Kashmiri punctuation such as <span lang="ks-Arab">، ؛ ؟ ۔</span> in a Kashmiri sentence and keep embedded Latin text left to right.</td>
                </tr>
              </tbody>
            </table>
            <p className="caution">
              <strong>Do not over-correct:</strong> normalisation can repair a code-point variant, but it cannot decide whether a rare literary word, name or dialect form is right. Preserve the original in a source field and record the preferred spelling separately.
            </p>
          </section>

          <section id="sounds">
            <h2>3. Sounds and transliteration</h2>
            <p>
              Kashmiri contrasts plain and aspirated stops, dental and retroflex consonants, several fricatives, palatalised consonants and a rich vowel system with central and nasalised qualities. The exact phonetic value of a letter depends on its position and its neighbours. Transliteration is therefore a reading aid, not a reversible replacement for Kashmiri spelling.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Kashmiri</th>
                  <th>Practical reading</th>
                  <th>What to check</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td lang="ks-Arab" dir="rtl">چ / چھ</td>
                  <td><code>ʧ / ʧʰ</code></td>
                  <td>Do not collapse aspirated <span lang="ks-Arab">چھ</span> into <span lang="ks-Arab">چ</span>.</td>
                </tr>
                <tr>
                  <td lang="ks-Arab" dir="rtl">ٹ / ڈ / ڑ</td>
                  <td><code>ʈ / ɖ / ɽ</code></td>
                  <td>These are retroflex sounds, distinct from dental <span lang="ks-Arab">ت د ر</span>.</td>
                </tr>
                <tr>
                  <td lang="ks-Arab" dir="rtl">ک / کھ</td>
                  <td><code>k / kʰ</code></td>
                  <td>Keep the aspiration marker in the written form.</td>
                </tr>
                <tr>
                  <td lang="ks-Arab" dir="rtl">ی / ؠ</td>
                  <td><code>y / ʲ</code></td>
                  <td><span lang="ks-Arab">ؠ</span> marks palatalisation; it is not an ordinary yeh.</td>
                </tr>
                <tr>
                  <td lang="ks-Arab" dir="rtl">َ ِ ُ ٕ</td>
                  <td><code>a i u ɨ</code></td>
                  <td>Combining marks carry vowel information and must stay attached to the right base sequence.</td>
                </tr>
              </tbody>
            </table>
            <p>
              Use the site’s generated transliteration for searching and pronunciation support. It follows the orthography mapping, including symbols such as <code>ʧ</code>, <code>ʈ</code>, <code>ɽ</code>, <code>ɨ</code>, <code>ə̄</code> and <code>ɔ</code>. For a publication, show the Kashmiri original first and treat the Latin line as an annotation.
            </p>

            <h3>Transliteration key</h3>
            <p>
              The following key is the project’s practical, Unicode-friendly reading system. It preserves contrasts that matter to Kashmiri learners. A macron or combining mark may represent vowel quality or length; a superscript <code>ʰ</code> marks aspiration; <code>ʲ</code> marks palatalisation. The key is more precise than English spelling.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Native letters or marks</th>
                  <th>Romanized output</th>
                  <th>Reading note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td lang="ks-Arab" dir="rtl">پ ب ت د ٹ ڈ</td>
                  <td><code>p b t d ʈ ɖ</code></td>
                  <td>Plain stops; <span lang="ks-Arab">ٹ ڈ</span> are retroflex.</td>
                </tr>
                <tr>
                  <td lang="ks-Arab" dir="rtl">پھ تھ چھ ٹھ کھ</td>
                  <td><code>pʰ tʰ ʧʰ ʈʰ kʰ</code></td>
                  <td>Aspirated digraphs stay distinct from plain stops.</td>
                </tr>
                <tr>
                  <td lang="ks-Arab" dir="rtl">چ ژ ج ش خ غ</td>
                  <td><code>ʧ ʦ ʤ ʃ x ġ</code></td>
                  <td>Affricates and fricatives use marked symbols rather than English approximations.</td>
                </tr>
                <tr>
                  <td lang="ks-Arab" dir="rtl">ر ڑ ی ؠ ہ ن ں</td>
                  <td><code>r ɽ y ʲ h n ñ</code></td>
                  <td><span lang="ks-Arab">ؠ</span> is palatalisation; nasal signs stay visible.</td>
                </tr>
                <tr>
                  <td lang="ks-Arab" dir="rtl">َ ِ ُ ٕ ٟ ٔ ٲ ۄ</td>
                  <td><code>a i u ɨ ɨ̄ ᵊ ə̄ ɔ</code></td>
                  <td>Vowel marks and carrier forms are transliterated in place.</td>
                </tr>
                <tr>
                  <td lang="ks-Arab" dir="rtl">آ وٗ وٚ</td>
                  <td><code>ã w˔ wᵉ</code></td>
                  <td>Long, rounded or modified vowel readings follow the orthography mapping.</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="words">
            <h2>4. How words are built</h2>
            <p>
              Kashmiri word forms carry information about number, gender, case, person, tense, aspect and agreement. A dictionary headword is only one point in a paradigm. When writing a sentence, check the inflected form rather than forcing the bare headword into every position.
            </p>
            <h3>Compounds and borrowed words</h3>
            <p>
              Compounds, reduplication, inherited Indo-Aryan vocabulary and Persian/Arabic/Urdu loans all occur in modern Kashmiri. A borrowed consonant or spelling should not be “purified” into a native sound if the source intentionally preserves the loan. Mark a loan or a proper name as such in editorial metadata.
            </p>
            <h3>Clitics and short forms</h3>
            <p>
              Short pronoun, copula and particle forms can attach phonologically to a neighbouring word. In a searchable dictionary, store both the surface phrase and the component analysis when known. In running text, follow the source’s spacing and do not split a clitic simply because English would use a separate word.
            </p>
            <h3>Inflection</h3>
            <p>
              Record a form with its grammatical features: <code>singular</code>, <code>plural</code>, <code>masculine</code>, <code>feminine</code>, <code>direct</code>, <code>oblique</code>, <code>ergative</code>, <code>past</code>, <code>imperfective</code> or <code>perfective</code>. If a form is not supported by a source, label it as a hypothesis instead of presenting it as a rule.
            </p>
          </section>

          <section id="nouns">
            <h2>5. Nouns, pronouns and cases</h2>
            <h3>Nouns and adjectives</h3>
            <p>
              Nouns have grammatical gender and number. Adjectives and participles may agree with the noun, the subject or the absolutive argument, depending on construction. Agreement is a sentence-level check: do not choose an adjective ending from the English noun alone.
            </p>
            <p>
              Case is commonly expressed through oblique forms, particles and postpositions. Postpositions follow their noun phrase, as in many Indo-Aryan languages. A noun before a postposition may therefore look different from the same noun used as a bare subject or object.
            </p>
            <h3>Pronouns</h3>
            <p>
              Pronoun forms have direct, oblique and case-marked uses. A polite or plural second-person form should not be replaced automatically with a singular form. In proofreading, identify the intended person and number first, then check the pronoun, its case marker and the verb or copula agreement together.
            </p>
            <h3>Case checklist</h3>
            <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Proofreading action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Who is the subject?</td>
                  <td>Check whether the clause is present/intransitive or a past transitive construction; the agent may be marked differently.</td>
                </tr>
                <tr>
                  <td>Who receives or experiences something?</td>
                  <td>Check dative/accusative marking and the form required by the verb.</td>
                </tr>
                <tr>
                  <td>Who owns or is related to something?</td>
                  <td>Check the genitive form and agreement with the possessed noun.</td>
                </tr>
                <tr>
                  <td>Where, from where or with what?</td>
                  <td>Use the attested locative, ablative or instrumental postposition; do not translate an English preposition word for word.</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="sentences">
            <h2>6. Sentences and word order</h2>
            <p>
              The safe default for a simple Kashmiri clause is <strong>subject–object–verb</strong>, with modifiers before the noun and postpositions after the noun phrase. Information structure can move a topic or focus to the front, and finite verbs can show a verb-second pattern in independent clauses. A sentence may therefore be grammatical even when it is not a rigid SOV string.
            </p>
            <p>
              Build a sentence in layers: (1) choose the predicate, (2) identify its arguments, (3) assign case, (4) select tense/aspect and agreement, (5) add negation or question marking, and (6) check the orthography. This order prevents an English word order from dictating Kashmiri endings.
            </p>
            <h3>Phrase structure</h3>
            <ul>
              <li><strong>Noun phrase:</strong> determiner/quantifier + adjective or modifier + noun + case/postposition.</li>
              <li><strong>Verb phrase:</strong> lexical verb or participle + auxiliary/copula and agreement material.</li>
              <li><strong>Subordination:</strong> the subordinate clause normally comes before the main clause; use the attested linker or participle.</li>
              <li><strong>Coordination:</strong> preserve the conjunction and repeat agreement only where the source grammar requires it.</li>
            </ul>
          </section>

          <section id="verbs">
            <h2>7. Verbs, tense, aspect and agreement</h2>
            <h3>Verb information</h3>
            <p>
              Every finite verb should be analysed for <strong>lexical root</strong>, <strong>aspect</strong>, <strong>tense or mood</strong>, <strong>person</strong>, <strong>number</strong> and any <strong>gender agreement</strong>. Kashmiri uses auxiliaries and copular material extensively. The infinitive and the stem are not interchangeable, and a participle is not automatically a finite verb.
            </p>
            <h3>Split alignment</h3>
            <p>
              Descriptions of Kashmiri report a split between present/intransitive patterns and many past transitive patterns. In a past transitive clause, the agent can receive ergative marking and agreement may be controlled by the absolutive argument or object. This is why translating “I read a book” by selecting a generic first-person verb ending can produce an agreement error. Check the tense, transitivity and object together.
            </p>
          </section>

          <section id="negation">
            <h2>8. Negation and questions</h2>
            <h3>Negation</h3>
            <p>
              Negation is grammatical, not merely punctuation. A negative particle or auxiliary can change the position and form of the copula or verb. Identify the construction first—nominal, copular, existential, verbal or imperative—then use the negative form recorded for that construction. Do not mechanically place English <em>not</em> before the Kashmiri verb.
            </p>
            <h3>Questions</h3>
            <p>
              Yes/no questions use Kashmiri syntax and intonation, with the question mark <span lang="ks-Arab">؟</span> in writing where appropriate. Question words normally occupy the same argument position as the answer they request; English subject–auxiliary inversion should not be copied.
            </p>
          </section>

          <section id="proofreading">
            <h2>9. The proofreading scheme</h2>
            <ol>
              <li><strong>Protect spans.</strong> Mark names, quotations, URLs, email addresses, numbers and code before editing.</li>
              <li><strong>Normalize encoding.</strong> Apply NFC, remove accidental zero-width characters and reject presentation-form glyphs.</li>
              <li><strong>Check script.</strong> Confirm the sentence is intentionally Perso-Arabic Kashmiri; flag accidental Urdu, Arabic or Persian substitutions.</li>
              <li><strong>Check graphemes.</strong> Verify Kashmiri kaf, yeh, heh, palatalisation, aspiration, nasalisation, vowel marks and initial-vowel carriers.</li>
              <li><strong>Check word boundaries.</strong> Confirm clitics, compounds, postpositions and punctuation against an attested source.</li>
              <li><strong>Check the predicate.</strong> Identify transitivity and TAM before checking agreement.</li>
              <li><strong>Check noun phrases.</strong> Verify gender, number, direct/oblique form and case marking.</li>
              <li><strong>Check polarity and questions.</strong> Ensure the negative or interrogative construction is the intended one.</li>
              <li><strong>Check meaning.</strong> Compare the sentence with its context; a dictionary gloss cannot decide a homograph or dialect form.</li>
              <li><strong>Generate transliteration last.</strong> Transliteration should reflect the final Kashmiri spelling, never replace it.</li>
            </ol>
            <p className="caution">
              <strong>Proofreading rule:</strong> a normalizer may fix <span lang="ks-Arab">ك</span> to <span lang="ks-Arab">ک</span> or remove a zero-width space, but it must not invent a word ending, case marker or translation. Automatic correction and grammatical proofreading are separate passes.
            </p>
          </section>

          <section id="templates">
            <h2>11. Writing templates</h2>
            <p className="ks-example" lang="ks-Arab">مےٚ پٔر اَکھ کِتاب</p>
            <p className="romanized" lang="ks-Latn"><strong>Romanized:</strong> mē pᵊr ạ̄akʰ kitạ̄b</p>
            <p className="translation">I read a book. The dictionary records this as a past transitive example; check the subject, object and agreement together.</p>

            <p className="ks-example" lang="ks-Arab">سٲری اِنسان چھِ آزاد زامٕتؠ۔</p>
            <p className="romanized" lang="ks-Latn"><strong>Romanized:</strong> sə̄ry ạ̄insạ̄n ʧʰi ãżạ̄d żạ̄mɨtʲ.</p>
            <p className="translation">All human beings are born free. This is the orthography reference sample; preserve its vowel marks and punctuation when citing it.</p>
          </section>

          <section id="sources">
            <h2>12. Sources, review and limits</h2>
            <p>
              The script and Unicode rules on this page follow the bundled Kashmiri Arabic orthography notes v32. Examples and lexical evidence come from the attributed dictionary records and the page-linked OCR collections.
            </p>
            <p>
              <button
                type="button"
                className="collection-button"
                style={{ width: 'auto', display: 'inline-block', marginRight: 12 }}
                onClick={onBackToDictionary}
              >
                ← Return to dictionary search
              </button>
              <button
                type="button"
                className="collection-button"
                style={{ width: 'auto', display: 'inline-block' }}
                onClick={onGoToOrthography}
              >
                Open Kashmiri orthography reference →
              </button>
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};
