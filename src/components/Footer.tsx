import React from 'react';

interface FooterProps {
  totalRecords: number;
}

export const Footer: React.FC<FooterProps> = ({ totalRecords }) => {
  return (
    <footer>
      <span>کٲشُر لُغَتھ · Koshur Lughat</span>
      <span>
        <span id="dictionary-total">{totalRecords > 0 ? totalRecords.toLocaleString() : 'Over 20,000'}</span> modern records · 20,643 historical entries · Public beta
        <br />
        Core vocabulary: Kashmiri Language Text Dataset
        <br />
        Additional vocabulary:{' '}
        <a href="https://kaikki.org/dictionary/Kashmiri/" target="_blank" rel="noopener noreferrer">
          Wiktionary via Kaikki
        </a>{' '}
        ·{' '}
        <a href="https://github.com/izan-majeed/kaeshir-dictionary-data" target="_blank" rel="noopener noreferrer">
          Kaeshir Dictionary
        </a>
      </span>
    </footer>
  );
};
