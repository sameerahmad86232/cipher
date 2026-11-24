#!/usr/bin/env python3
import unittest

from kashmiri_speech_frontend import ascii_g2p, g2p, grapheme_units, normalize_for_tts


class KashmiriSpeechFrontendTests(unittest.TestCase):
    def test_normalization_is_idempotent_and_preserves_marks(self):
        source = "  مےٚ ناو  چھُ سمیر ?  "
        expected = "مےٚ ناو چھُ سمیر؟"
        self.assertEqual(normalize_for_tts(source), expected)
        self.assertEqual(normalize_for_tts(expected), expected)
        self.assertIn("ےٚ", grapheme_units(expected))
        self.assertIn("ھُ", grapheme_units(expected))

    def test_documented_variants_and_controls_are_cleaned(self):
        self.assertEqual(normalize_for_tts("ك\u200bِتاب، يہ"), "کِتاب، یہ")
        self.assertEqual(normalize_for_tts("سوال؟؟"), "سوال؟")

    def test_g2p_keeps_unknowns_visible_instead_of_dropping_them(self):
        phones = g2p("کٲشُر 2")
        self.assertTrue(any("əː" in phone for phone in phones))
        self.assertIn("<g:2>", phones)
        self.assertNotIn("", phones)

    def test_words_are_not_lexically_rewritten(self):
        source = "تُہۍ کِتھ پٲٹھۍ چھِو"
        self.assertEqual(normalize_for_tts(source), source)

    def test_ascii_g2p_covers_previously_dropped_kashmiri_symbols(self):
        output = ascii_g2p("پٮ۪ٹھۍ کٲشُر ؠ")
        self.assertTrue(output.isascii())
        self.assertIn("bi", output)
        self.assertIn("ii", output)
        self.assertIn("aa", output)


if __name__ == "__main__":
    unittest.main()
