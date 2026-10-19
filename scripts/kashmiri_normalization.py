"""Shared preprocessing adapter; source fields and Kashmiri vowels are retained."""

from collections import Counter
from functools import lru_cache
from importlib.metadata import version
import unicodedata

UPSTREAM_REVISION = "9bb966e76b88caf875bfb9facf3036bef706427e"


@lru_cache(maxsize=1)
def _backend():
    try:
        from KashmiriNormalizer import KashmiriNormalizer
    except ImportError as error:
        raise RuntimeError(
            "Install normalization dependencies in this Python environment: "
            "python -m pip install -r requirements-normalization.txt"
        ) from error
    return KashmiriNormalizer()


def _marks(text):
    return Counter(char for char in unicodedata.normalize("NFD", text)
                   if unicodedata.category(char).startswith("M"))


def normalize_kashmiri(text):
    """Return a derived copy and diagnostics, never remove vowel marks.

    Use only on Kashmiri fields. Quranic Arabic and other language fields
    must retain their own orthography. The upstream TTS character filter and
    per-digit word expansion are deliberately not used.
    """
    if not isinstance(text, str):
        raise TypeError("Kashmiri normalization expects a string")
    original = text
    normalized = unicodedata.normalize(
        "NFC", _backend().normalize(text, removeDiacritics=False)
    )
    warnings = []
    lost_marks = _marks(original) - _marks(normalized)
    if lost_marks:
        normalized = unicodedata.normalize("NFC", original)
        warnings.append("Upstream normalization would remove combining marks; retained the source text.")
    return {
        "original": original,
        "normalized": normalized,
        "changed": normalized != original,
        "warnings": warnings,
    }


def normalizer_metadata():
    _backend()  # Fail clearly before writing output if the dependency is missing.
    return {
        "library": "KashmiriNormalizer",
        "version": version("KashmiriNormalizer"),
        "revision": UPSTREAM_REVISION,
        "diacritics": "preserved; transformations that remove marks are blocked",
        "digitPolicy": "digits standardized; no automatic number-to-word expansion",
    }
