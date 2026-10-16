import React from 'react';

export const AboutView: React.FC = () => {
  return (
    <section id="about-view" className="about-view">
      <p className="eyebrow">ABOUT THE PROJECT</p>
      <h1>
        A practical home for<br />
        <em>Kashmiri words.</em>
      </h1>
      <div className="about-grid">
        <p>
          Koshur Lughat is a searchable Kashmiri–English dictionary and a server-side neural sentence translator for the Perso-Arabic script.
        </p>
        <div>
          <h2>More than a word list</h2>
          <p>
            Multiple meanings are grouped by headword. Sourced entries include sense context, transliteration, IPA, examples, inflected forms and related vocabulary where supplied. A separate historical romanized collection preserves 20,643 older entries without presenting them as modern spellings. The complete Koul book OCR is searchable by page and clearly labeled machine output. Form counts are separate from definition counts.
          </p>
        </div>
        <div>
          <h2>Real models, honest limits</h2>
          <p>
            A public NLLB-200 600M model translates sentences with three-beam decoding online; a browser-compatible quantized copy can also be cached on a device for offline use. Translation is automatic, not native-speaker reviewed. Kashmiri needs much more evaluation; this site does not claim world-leading accuracy.
          </p>
        </div>
        <div>
          <h2>Sources &amp; reuse</h2>
          <p>
            We import explicitly identified Kashmiri definitions and translation-table pairs, not guessed meanings from monolingual or audio corpora. Gated datasets need their owners’ access approval. Original vocabulary has unresolved licensing; Wiktionary adaptations are CC BY-SA 4.0, and Kaeshir Dictionary data is MIT licensed. Read the source and model documentation and Kaeshir license before redistribution.
          </p>
        </div>
        <div>
          <h2>Reference book</h2>
          <p>
            We check existing entries against{' '}
            <a
              href="https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul"
              target="_blank"
              rel="noopener noreferrer"
            >
              Koul, Raina and Bhat’s Kashmiri–English Dictionary for Second Language Learners
            </a>{' '}
            (2000). The project owner reports rights-holder approval for public reuse. We add manually checked entries and page-linked references; the scan’s machine OCR is too unreliable for an unreviewed bulk import.
          </p>
        </div>
        <div>
          <h2>Privacy &amp; storage</h2>
          <p>
            Online sentences are sent to the public translation server. Offline mode downloads a quantized NLLB model to this device; after that, translation can run without a server. Recent searches stay in this browser.
          </p>
        </div>
      </div>
    </section>
  );
};
