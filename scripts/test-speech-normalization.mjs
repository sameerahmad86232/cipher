import assert from 'node:assert/strict';
import { normalizeKashmiriTts, normalizeWhisperTranscript } from '../api/_kashmiriSpeech.js';

assert.equal(normalizeKashmiriTts('  مےٚ ناو  چھُ سمیر ? '), 'مےٚ ناو چھُ سمیر؟');
assert.equal(normalizeKashmiriTts('ك\u200bِتاب، يہ'), 'کِتاب، یہ');
assert.equal(normalizeWhisperTranscript(' تُہۍ  كِتھ  پٲٹھۍ  چھِو ؟ '), 'تُہۍ کِتھ پٲٹھۍ چھِو؟');
assert.equal(normalizeWhisperTranscript('مےٚ مےٚ ناو'), 'مےٚ مےٚ ناو');
console.log('Speech normalization tests passed');
