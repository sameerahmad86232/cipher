import React, { useState } from 'react';

interface OrthographyViewProps {
  onBackToDictionary: () => void;
  onGoToLanguageGuide: () => void;
}

export const OrthographyView: React.FC<OrthographyViewProps> = ({
  onBackToDictionary,
  onGoToLanguageGuide
}) => {
  const [sampleFontSize, setSampleFontSize] = useState<number>(36);

  return (
    <div className="orthography-wrapper">
      <main className="orthography-main">
        <header>
          <p className="eyebrow">WRITING SYSTEM · SOURCE NOTES V32</p>
          <h1>Kashmiri Arabic orthography</h1>
          <p className="lede">
            The complete Kashmiri Perso-Arabic writing and typography reference used by this dictionary: sounds, characters, combining marks, shaping, direction, layout, punctuation and forms.
          </p>
          <p className="source-credit">
            <strong>Source and attribution.</strong> Richard Ishida,{' '}
            <em>Arabic (Kashmiri), Nastaliq orthography notes v32</em>, updated 27 April 2026. The project owner reports rights-holder permission for this public reuse. The original reference remains available at{' '}
            <a href="https://r12a.github.io/scripts/arab/ks.html" target="_blank" rel="noopener noreferrer">
              r12a.github.io/scripts/arab/ks.html
            </a>.
          </p>
        </header>

        <nav className="orthography-toc" aria-label="Orthography sections">
          <strong>On this page</strong>
          <a href="#sample">Interactive sample</a>
          <a href="#features">Basic script features</a>
          <a href="#consonants">Consonant inventory</a>
          <a href="#vowels">Vowel system</a>
          <a href="#confusables">Confusables &amp; spelling errors</a>
          <a href="#numbers">Numbers &amp; punctuation</a>
        </nav>

        <article className="orthography-content">
          <section id="sample">
            <h2>Interactive sample</h2>
            <p>
              Adjust font size to inspect Nastaliq letter connections and Kashmiri diacritics:
              <input
                type="range"
                min="18"
                max="64"
                step="2"
                value={sampleFontSize}
                onChange={e => setSampleFontSize(Number(e.target.value))}
                style={{ marginLeft: 12, verticalAlign: 'middle' }}
              />{' '}
              <span>{sampleFontSize}px</span>
            </p>
            <div
              dir="rtl"
              lang="ks"
              style={{
                fontSize: `${sampleFontSize}px`,
                padding: '24px',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                background: '#fdfcf8',
                fontFamily: '"Noto Nastaliq Urdu", serif',
                lineHeight: 2.2,
                marginTop: '12px'
              }}
            >
              سٲری اِنسان چھِ آزاد زامٕتؠ۔ وؠقار تہٕ حۆقوٗق چھِ ہِوی۔ تِمَن چھُ سوچ سَمَج عَطا کَرنہٕ آمُت تہٕ تِمَن پَزِ بٲے بَرادٔری ہٕنٛدِس جَذباتَس تَحَت اکھ أکِس اکار بَکار یُن ۔
            </div>
            <p className="smallprint" style={{ marginTop: '8px', color: 'var(--muted)' }}>
              Source: Omniglot, article 1 of the Universal Declaration of Human Rights in Kashmiri.
            </p>
          </section>

          <section id="features">
            <h2>Basic script features</h2>
            <p>
              The Kashmiri Arabic orthography is an <strong>alphabet</strong>: all vowels are written explicitly alongside consonants. Unlike Arabic, Persian, and Urdu, all vowel diacritics are always visible in carefully edited Kashmiri texts. Representation of several vowel sounds utilizes different code points in medial vs. final positions.
            </p>
            <p>
              Kashmiri Arabic text runs <strong>right to left</strong> in horizontal lines, but numbers and embedded Latin text are read left to right. It is principally written using the Nastaliq style of Arabic writing, characterized by sloping baselines, hanging connections, and distinct letterforms.
            </p>
          </section>

          <section id="consonants">
            <h2>Consonant inventory</h2>
            <p>
              Modern Kashmiri has 21 basic consonant letters and 6 aspirated digraphs, and uses 13 additional letters for words loaned from Persian, Arabic and Urdu.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Native characters</th>
                  <th>IPA reading</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Plain stops &amp; affricates</td>
                  <td lang="ks-Arab" dir="rtl">پ ب ت د ٹ ڈ ک گ چ ج ژ</td>
                  <td>p b t d ʈ ɖ k g ʧ ʤ ʦ</td>
                  <td>Includes retroflex <span lang="ks-Arab">ٹ ڈ</span> and alveolar affricate <span lang="ks-Arab">ژ</span></td>
                </tr>
                <tr>
                  <td>Aspirated digraphs</td>
                  <td lang="ks-Arab" dir="rtl">پھ تھ ٹھ کھ چھ ژھ</td>
                  <td>pʰ tʰ ʈʰ kʰ ʧʰ ʦʰ</td>
                  <td>Formed with following do-chashmi heh <span lang="ks-Arab">ھ</span></td>
                </tr>
                <tr>
                  <td>Nasals &amp; Liquids</td>
                  <td lang="ks-Arab" dir="rtl">م ن ر ڑ ل</td>
                  <td>m n r ɽ l</td>
                  <td>Includes retroflex flap <span lang="ks-Arab">ڑ</span></td>
                </tr>
                <tr>
                  <td>Palatalisation</td>
                  <td lang="ks-Arab" dir="rtl">ؠ</td>
                  <td>ʲ</td>
                  <td>Kashmiri yeh (U+0620); marks palatalized consonants</td>
                </tr>
                <tr>
                  <td>Fricatives &amp; Loans</td>
                  <td lang="ks-Arab" dir="rtl">س ز ش خ غ ف ق ص ض ط ظ ع ح ذ ث</td>
                  <td>s z ʃ x ġ f ḱ s z t z ʔ ħ z s</td>
                  <td>Preserved in literary, historical, and loan vocabulary</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="vowels">
            <h2>Vowel system</h2>
            <p>
              Vowels in Kashmiri use a combination of 10 combining marks and 10 letters. Standalone vowels in word-initial position are preceded by or attached to carrier alef (<span lang="ks-Arab">ا</span>) or ain (<span lang="ks-Arab">ع</span>).
            </p>
            <table>
              <thead>
                <tr>
                  <th>Vowel sound</th>
                  <th>Medial form</th>
                  <th>Initial carrier form</th>
                  <th>Romanization</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Short a</td>
                  <td lang="ks-Arab">َ (zer)</td>
                  <td lang="ks-Arab">اَ</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>Long ā</td>
                  <td lang="ks-Arab">ا</td>
                  <td lang="ks-Arab">آ</td>
                  <td>ã / ạ̄</td>
                </tr>
                <tr>
                  <td>Short i</td>
                  <td lang="ks-Arab">ِ (pesh)</td>
                  <td lang="ks-Arab">اِ</td>
                  <td>i</td>
                </tr>
                <tr>
                  <td>Long ī</td>
                  <td lang="ks-Arab">یٖ</td>
                  <td lang="ks-Arab">ایٖ</td>
                  <td>yˌ</td>
                </tr>
                <tr>
                  <td>Short u</td>
                  <td lang="ks-Arab">ُ</td>
                  <td lang="ks-Arab">اُ</td>
                  <td>u</td>
                </tr>
                <tr>
                  <td>High central ɨ</td>
                  <td lang="ks-Arab">ٕ</td>
                  <td lang="ks-Arab">إ</td>
                  <td>ɨ</td>
                </tr>
                <tr>
                  <td>Long central ɨ̄</td>
                  <td lang="ks-Arab">ٟ</td>
                  <td lang="ks-Arab">اٟ</td>
                  <td>ɨ̄</td>
                </tr>
                <tr>
                  <td>Open central ə̄</td>
                  <td lang="ks-Arab">ٲ</td>
                  <td lang="ks-Arab">ٲ</td>
                  <td>ə̄</td>
                </tr>
                <tr>
                  <td>Short rounded ɔ</td>
                  <td lang="ks-Arab">ۄ</td>
                  <td lang="ks-Arab">اۄ</td>
                  <td>ɔ</td>
                </tr>
                <tr>
                  <td>Close-mid rounded o</td>
                  <td lang="ks-Arab">وٚ</td>
                  <td lang="ks-Arab">اوٚ</td>
                  <td>wᵉ</td>
                </tr>
                <tr>
                  <td>Long rounded uː</td>
                  <td lang="ks-Arab">وٗ</td>
                  <td lang="ks-Arab">اوٗ</td>
                  <td>w˔</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="confusables">
            <h2>Confusables &amp; spelling errors</h2>
            <p>
              The dictionary's autocorrect engine normalizes documented confusion pairs and OCR artifacts to official Unicode Kashmiri characters:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Incorrect / Confusable code point</th>
                  <th>Preferred standard Kashmiri</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>U+066E + U+06EA (dotless beh + low stop)</td>
                  <td lang="ks-Arab">ؠ (U+0620)</td>
                  <td>Employed when Kashmiri yeh was absent from older fonts; corrupts semantics.</td>
                </tr>
                <tr>
                  <td>U+06CD (Pashto ye)</td>
                  <td lang="ks-Arab">ؠ (U+0620)</td>
                  <td>Appears in texts where word-final Kashmiri yeh belongs.</td>
                </tr>
                <tr>
                  <td>U+06C5 (Kirghiz oe)</td>
                  <td lang="ks-Arab">ۄ (U+06C4)</td>
                  <td>Misencoded variant for waw with ring.</td>
                </tr>
                <tr>
                  <td>U+065B (Vowel sign)</td>
                  <td lang="ks-Arab">ْ (U+0652 jazm)</td>
                  <td>Visual lookalike that breaks text parsing; sukun/jazm is the standard sign.</td>
                </tr>
                <tr>
                  <td>U+0643 (Arabic kaf ك)</td>
                  <td lang="ks-Arab">ک (U+06A9)</td>
                  <td>Kashmiri standard kaf has no interior stroke.</td>
                </tr>
                <tr>
                  <td>U+064A / U+0649 (Arabic yeh)</td>
                  <td lang="ks-Arab">ی (U+06CC)</td>
                  <td>Standard Farsi/Urdu/Kashmiri dotless yeh in isolated/final positions.</td>
                </tr>
                <tr>
                  <td>U+0647 / U+0629 (Arabic heh / teh marbuta)</td>
                  <td lang="ks-Arab">ہ (U+06C1)</td>
                  <td>Heh goal is the standard Kashmiri letter.</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="numbers">
            <h2>Numbers &amp; punctuation</h2>
            <p>
              Kashmiri uses Arabic-Indic numerals (<span lang="ks-Arab">۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹</span>) and Kashmiri punctuation symbols such as comma (<span lang="ks-Arab">،</span>), semicolon (<span lang="ks-Arab">؛</span>), question mark (<span lang="ks-Arab">؟</span>), and full stop (<span lang="ks-Arab">۔</span>).
            </p>
            <div style={{ marginTop: 24 }}>
              <button
                type="button"
                className="collection-button"
                style={{ width: 'auto', display: 'inline-block', marginRight: 12 }}
                onClick={onBackToDictionary}
              >
                ← Return to dictionary
              </button>
              <button
                type="button"
                className="collection-button"
                style={{ width: 'auto', display: 'inline-block' }}
                onClick={onGoToLanguageGuide}
              >
                Open Kashmiri language guide →
              </button>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};
