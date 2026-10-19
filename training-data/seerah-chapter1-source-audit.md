# Seerah Chapter 1: source-alignment audit

Scope: *The Sealed Nectar*, PDF pages 8–13, compared with the project's
previously reviewed Chapter 1 passage pairs. This is a review queue, **not**
approved Kashmiri training data or a claim that the latest chat draft is final.

| Priority | Source detail | Status in existing website pairs | Review action |
| --- | --- | --- | --- |
| High | Area is 1,000,000–1,250,000 square miles | Earlier Kashmiri numeral does not clearly express 1,250,000 | Confirm the Kashmiri number wording with a native reviewer. |
| High | The "Perishing Arabs" examples include ‘Ad, Thamud, Tasam, Jadis and Emlaq | Examples omitted in the short pair | Restore and verify spellings against the PDF/OCR. |
| High | Tha‘labah's descendants include Aws and Khazraj, sons of Haritha bin Tha‘labah | Omitted | Restore lineage, preserving who is whose son. |
| High | The Azd descendants in Tihama are named Azd-of-Shanu‘a | Omitted | Restore name and location. |
| High | The PDF's Abraham/Hagar passage calls Hagar Pharaoh's daughter | Not covered by reviewed pairs | Attribute to the book; verify against the cited Bukhari passage before publication. |
| High | Qur'an 37:103–107 is quoted in the PDF | Not covered by reviewed pairs | Check Arabic source and a qualified reviewer; do not publish an unreviewed sacred-text translation. |
| Medium | The Pharaoh/Abraham/Ur paragraph begins at the bottom of page 9 and continues on page 10 | Stored pair compresses and changes some name/place relations | Review sentence alignment across page boundary. |
| Medium | The Kinda paragraph includes expulsion to Hadramout and Najd | Existing wording is ambiguous about who expelled whom and where | Resolve agent/location explicitly. |
| Medium | Proper names contain OCR artifacts in the PDF, such as `Tham?`, `Muzaiqb?#146;`, `All?` | OCR is not reliable for names | Check page image, not only extracted text. |

## Training decision

Do not feed this chapter's unreviewed new draft into LoRA training. The
owner-reviewed passages are valuable but contain source-alignment omissions;
the priority is native-speaker correction and a verified sentence-pair table.
Additional model weights or noisy synthetic data cannot repair a wrong target.

## Available model/data constraints checked 2026-10-19

- OPUS `translatewiki` and `wikimedia` English–Kashmiri pairs are already
  imported and are silver quality. OPUS also lists GNOME (Devanagari Kashmiri),
  Tatoeba (three Latin-transliterated pairs) and Ubuntu; none is a useful new
  modern Perso-Arabic Chapter 1 training corpus.
- Qamar 30K/270K and BPCC downloads return 401 without a current approved
  Hugging Face session. Their licenses/access terms must still be followed.
- IndicTrans2 is gated; BhashaVerse is public but about 1.1B parameters.
  Neither has been downloaded, benchmarked or fine-tuned in this workspace.
- This workspace has no CUDA GPU, PyTorch or Transformers installation. No
  second neural model was trained here.
