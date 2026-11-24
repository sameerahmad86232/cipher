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
    # Arabic-Indic and Persian digits must reach XTTS as ordinary digits.
    "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
    "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
    "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4",
    "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
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
ASCII_BASE = {
    "ا": "a", "آ": "aa", "ب": "b", "پ": "p", "ت": "t", "ٹ": "tt", "ث": "s",
    "ج": "j", "چ": "ch", "ح": "h", "خ": "kh", "د": "d", "ڈ": "dd", "ذ": "z",
    "ر": "r", "ڑ": "rr", "ز": "z", "ژ": "zh", "س": "s", "ش": "sh", "ص": "s",
    "ض": "z", "ط": "t", "ظ": "z", "ع": "a", "غ": "gh", "ف": "f", "ق": "q",
    "ک": "k", "گ": "g", "ل": "l", "م": "m", "ن": "n", "ں": "n", "و": "w",
    "ہ": "h", "ھ": "h", "ء": "'", "ی": "y", "ے": "e", "ۍ": "ii", "ؠ": "y",
    "ٲ": "aa", "ۄ": "o", "ۆ": "o", "ٮ": "b",
}
ASCII_MARK = {
    "َ": "a", "ِ": "i", "ُ": "u", "ْ": "", "ٕ": "e", "ٖ": "ee",
    "ٗ": "oo", "۪": "i", "ٔ": "'", "ٰ": "aa",
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


def ascii_g2p(text: str) -> str:
    """Return tokenizer-safe Kashmiri pronunciation hints using ASCII only.

    XTTS's published vocabulary lacks multiple Kashmiri code points. Training
    and inference must both use this deterministic representation so no letter
    is silently discarded. Unknown Arabic graphemes fail loudly.
    """
    output: list[str] = []
    for unit in grapheme_units(text):
        if unit.isspace():
            output.append(" ")
            continue
        if unit in "،؛؟۔!":
            output.append({"،": ",", "؛": ";", "؟": "?", "۔": ".", "!": "!"}[unit])
            continue
        base, marks = unit[0], unit[1:]
        if base.isascii():
            token = base
        else:
            token = ASCII_BASE.get(base)
            if token is None:
                raise ValueError(f"No ASCII G2P mapping for Kashmiri grapheme U+{ord(base):04X} {base!r}")
        for mark in marks:
            if mark == "ّ":
                # Shadda is consonant gemination, not a literal punctuation
                # symbol. Repeat the base pronunciation for XTTS.
                token += ASCII_BASE.get(base, token)
                continue
            mapped = ASCII_MARK.get(mark)
            if mapped is None:
                if unicodedata.combining(mark):
                    raise ValueError(f"No ASCII G2P mapping for Kashmiri mark U+{ord(mark):04X}")
                mapped = mark
            token += mapped
        output.append(token)
    value = "".join(output)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("text")
    args = parser.parse_args()
    payload = {"original": args.text, "normalized": normalize_for_tts(args.text), "units": grapheme_units(args.text), "phones": g2p(args.text), "asciiPhones": ascii_g2p(args.text)}
    print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
