#!/usr/bin/env python3
"""Conservative Kashmiri text frontend for speech models.

This module normalizes encoding and segments model-facing grapheme/diacritic
units. It deliberately does not guess missing vowels or rewrite vocabulary.
"""

from __future__ import annotations

import argparse
import json
import re
import unicodedata


VARIANTS = str.maketrans({
    "ك": "ک", "ي": "ی", "ى": "ی", "ئ": "یٔ", "ة": "ہ", "ه": "ہ",
    "أ": "ا", "إ": "ا", "ٱ": "ا", "ٵ": "ٲ",
    "ۅ": "ۄ", "ٛ": "ْ",
})
REMOVED_CONTROLS = {"\u200b", "\u200c", "\u200d", "\u2060", "\ufeff", "\u061c", "\u200e", "\u200f"}
PUNCTUATION = {",": "،", ";": "؛", "?": "؟", ".": "۔"}
IPA_BASE = {
    "ب": "b", "پ": "p", "ت": "t", "ٹ": "ʈ", "ج": "dʒ", "چ": "tʃ",
    "خ": "x", "د": "d", "ڈ": "ɖ", "ر": "r", "ڑ": "ɽ", "ز": "z",
    "ژ": "ʒ", "س": "s", "ش": "ʃ", "ف": "f", "ق": "q", "ک": "k",
    "گ": "g", "ل": "l", "م": "m", "ن": "n", "و": "w", "ہ": "h",
    "ی": "j", "ۍ": "iː", "ع": "ʕ", "غ": "ɣ", "ٲ": "əː",
}
IPA_MARK = {
    "َ": "a", "ِ": "i", "ُ": "u", "ْ": "", "ٕ": "ə", "ٖ": "iː",
    "ٗ": "uː", "ٲ": "əː", "ۄ": "ɔ", "ۆ": "o", "ؠ": "ʲ",
}


def normalize_for_tts(text: str) -> str:
    """Normalize code points and typography while preserving lexical content."""
    if not isinstance(text, str):
        raise TypeError("Kashmiri speech normalization expects a string")
    # NFKC is used once to decode Arabic presentation forms; NFC is the stored form.
    value = unicodedata.normalize("NFKC", text)
    value = "".join(ch for ch in value if ch not in REMOVED_CONTROLS and unicodedata.category(ch) != "Cf")
    value = value.translate(VARIANTS)
    value = "".join(PUNCTUATION.get(ch, ch) for ch in value)
    value = re.sub(r"\s+", " ", value)
    value = re.sub(r"([،؛؟۔!])(?:\s*\1)+", r"\1", value)
    value = re.sub(r"\s*([،؛؟۔!])\s*", r"\1 ", value)
    return unicodedata.normalize("NFC", value).strip()


def grapheme_units(text: str) -> list[str]:
    """Return stable base+combining-mark units for grapheme-based TTS models."""
    normalized = normalize_for_tts(text)
    units: list[str] = []
    for character in normalized:
        if unicodedata.combining(character) and units and units[-1] != " ":
            units[-1] += character
        else:
            units.append(character)
    return units


def g2p(text: str) -> list[str]:
    """Produce conservative IPA-like tokens; unknown graphemes remain explicit."""
    phones: list[str] = []
    for unit in grapheme_units(text):
        if unit.isspace() or unit in "،؛؟۔!":
            phones.append("<space>" if unit.isspace() else f"<p:{unit}>")
            continue
        base, marks = unit[0], unit[1:]
        phone = IPA_BASE.get(base, f"<g:{base}>")
        for mark in marks:
            phone += IPA_MARK.get(mark, f"<m:{ord(mark):04X}>")
        phones.append(phone)
    return phones


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("text")
    args = parser.parse_args()
    payload = {"original": args.text, "normalized": normalize_for_tts(args.text), "units": grapheme_units(args.text), "phones": g2p(args.text)}
    print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
