import React from 'react';

/** The same buildless reader is published independently to the zameer repository. */
export const SeerahView: React.FC = () => (
  <section aria-label="The Sealed Nectar, Kashmiri reading edition" style={{ width: '100%' }}>
    <iframe
      src="./seerah/index.html"
      title="Nectar — The Sealed Nectar in English and Kashmiri"
      style={{ display: 'block', width: '100%', height: 'calc(100dvh - 110px)', minHeight: 640, border: 0, borderRadius: 12 }}
      allow="clipboard-write"
    />
    <p style={{ textAlign: 'center', fontSize: 12, padding: 12 }}>
      <a href="./seerah/index.html">Open the full-screen Seerah reader ↗</a>
    </p>
  </section>
);
