#!/usr/bin/env python3
"""Build assets/kashmiri-reading-ocr.json (+ .txt) from Internet Archive DjVu XML.

Internet Archive pre-computes DjVu XML OCR for most of its scanned books, so no
local OCR engine is needed: this script downloads that XML (or reuses an existing
copy under source-ocr/reading/) and keeps one text block per scanned page.

Appending is the default and is deliberately conservative: the existing payload is
loaded first, every existing book and page is preserved exactly as parsed, and only
books whose ``id`` is not already present are appended. Previously published page
text therefore cannot regress or be reordered. ``--rebuild`` does a from-scratch
build and is not part of the normal pipeline.

Failures are per book: a download or parse problem is reported as ``skipped`` with a
reason and the remaining books are still processed.
"""
from __future__ import annotations

import argparse
import html
import json
import pathlib
import shutil
import sys
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

# Repo-relative paths, resolved from this file so the script works from any CWD.
ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS_DIR = ROOT / 'assets'
SOURCE_DIR = ROOT / 'source-ocr' / 'reading'
JSON_OUT = ASSETS_DIR / 'kashmiri-reading-ocr.json'
TXT_OUT = ASSETS_DIR / 'kashmiri-reading-ocr.txt'

METADATA_URL = 'https://archive.org/metadata/{iaid}'
DOWNLOAD_URL = 'https://archive.org/download/{iaid}/{name}'
USER_AGENT = (
    'KoshurLughat-reading-library/1.0 (static Kashmiri dictionary site; '
    'fetches Internet Archive DjVu XML OCR; contact: site maintainer)'
)
TIMEOUT_SECONDS = 180

PAYLOAD_DEFAULTS = {
    'title': 'Kashmiri reading library · grammar, textbooks and translations OCR',
    'language': 'Kashmiri',
    'script': 'Perso-Arabic',
    'source': 'Internet Archive scans listed in the Koshur Lughat reading library',
    'permission': (
        'Archive metadata does not state a reuse license for these records. '
        'Preserve source links and verify rights before redistribution or publication '
        'of extracted text.'
    ),
    'method': 'Internet Archive DjVu XML OCR, page-preserving; machine output requires review.',
    'normalization': (
        'Raw text is preserved; the site derives a conservative normalized view and '
        'transliteration for reading support.'
    ),
}

APPEND_PERMISSION_NOTE = (
    ' Licences for the newer additions are recorded per book exactly as reported by the '
    'archive.org metadata API at build time; where no reuse licence is reported that is '
    'stated in the book entry rather than assumed.'
)

# Human-readable labels for the licence URLs archive.org reports. Keys are normalised
# by normalise_license_url(); values are never inferred beyond the URL itself.
CC_LICENSE_LABELS = {
    'http://creativecommons.org/publicdomain/zero/1.0/': 'CC0 1.0 (public domain dedication)',
    'http://creativecommons.org/licenses/by/4.0/': 'CC BY 4.0',
    'http://creativecommons.org/licenses/by-sa/4.0/': 'CC BY-SA 4.0',
    'http://creativecommons.org/licenses/by-nc/4.0/': 'CC BY-NC 4.0',
    'http://creativecommons.org/licenses/by-nc-sa/4.0/': 'CC BY-NC-SA 4.0',
    'http://creativecommons.org/licenses/by-nd/4.0/': 'CC BY-ND 4.0',
    'http://creativecommons.org/licenses/by-nc-nd/4.0/': 'CC BY-NC-ND 4.0',
    'http://creativecommons.org/licenses/by/3.0/': 'CC BY 3.0',
    'http://creativecommons.org/licenses/by-nc/3.0/': 'CC BY-NC 3.0',
}

# ---------------------------------------------------------------------------
# OCR quality gate
#
# Internet Archive's DjVu XML layer is only usable when the scan actually has a
# text layer. Nastaliq photo-scans usually produce a few characters per page of
# noise, which would bloat the reading library and degrade the site, so every
# candidate is measured before anything is appended. A book is appended only if
# it has pages, a real text density, and text that is plausibly in the script of
# the work. A book that fails is reported as rejected with its numbers.
# ---------------------------------------------------------------------------
MIN_CHARACTERS_PER_PAGE = 200
MIN_ARABIC_LETTER_SHARE = 0.50

ARABIC_RANGES = (
    (0x0600, 0x06FF),  # Arabic
    (0x0750, 0x077F),  # Arabic Supplement
    (0x08A0, 0x08FF),  # Arabic Extended-A
    (0xFB50, 0xFDFF),  # Arabic Presentation Forms-A
    (0xFE70, 0xFEFF),  # Arabic Presentation Forms-B
)
DEVANAGARI_RANGE = (0x0900, 0x097F)


def measure_pages(pages):
    """Measured OCR quality: density, script mix, and two raw samples."""
    arabic = latin = devanagari = other_letters = 0
    characters = non_space = 0
    for page in pages:
        text = page.get('text') or ''
        characters += len(text)
        for character in text:
            if not character.isspace():
                non_space += 1
            code = ord(character)
            if any(low <= code <= high for low, high in ARABIC_RANGES):
                arabic += 1
            elif 'A' <= character <= 'Z' or 'a' <= character <= 'z':
                latin += 1
            elif DEVANAGARI_RANGE[0] <= code <= DEVANAGARI_RANGE[1]:
                devanagari += 1
            elif character.isalpha():
                other_letters += 1
    letters = arabic + latin + devanagari + other_letters
    samples = [p['text'][:200] for p in pages if (p.get('text') or '').strip()][:2]
    non_empty = [p for p in pages if (p.get('text') or '').strip()]
    mid_samples = []
    for fraction in (0.4, 0.7):
        if non_empty:
            index = min(len(non_empty) - 1, int(len(non_empty) * fraction))
            mid_samples.append(
                f"page {non_empty[index]['page']}: {non_empty[index]['text'][:200]}"
            )
    return {
        'pages': len(pages),
        'characters': characters,
        'charactersPerPage': round(characters / len(pages), 1) if pages else 0,
        'arabicScriptCharacters': arabic,
        'latinCharacters': latin,
        'devanagariCharacters': devanagari,
        'otherLetterCharacters': other_letters,
        'letterCharacters': letters,
        'nonSpaceCharacters': non_space,
        'arabicLetterShare': round(arabic / letters, 4) if letters else 0.0,
        'arabicNonSpaceShare': round(arabic / non_space, 4) if non_space else 0.0,
        'samples': samples,
        'midSamples': mid_samples,
    }


def gate_failures(item, metrics):
    """Numeric reasons this candidate must NOT be appended (empty list => passes)."""
    reasons = []
    if metrics['pages'] <= 0:
        reasons.append('zero pages parsed')
    if metrics['charactersPerPage'] < MIN_CHARACTERS_PER_PAGE:
        reasons.append(
            f"average {metrics['charactersPerPage']} characters/page is below the "
            f'{MIN_CHARACTERS_PER_PAGE} characters/page floor (no usable text layer)'
        )
    if metrics['arabicLetterShare'] < MIN_ARABIC_LETTER_SHARE and not item.get('gate_exempt_reason'):
        reasons.append(
            f"Arabic-script share {metrics['arabicLetterShare']:.2f} of letter characters is "
            f'below {MIN_ARABIC_LETTER_SHARE:.2f} and this item is not a documented '
            'Romanised/Devanagari language course'
        )
    return reasons


# The 10 books already published in this payload. Their licence strings are kept
# verbatim so `--rebuild` still reproduces the current entries.
LEGACY_ITEMS = [
    ('dli.ernet.504533', 'kashur-grammer', 'Kashur Grammer', 'Naji Munwar and Shafi Shoque',
     'Grammar', 'https://archive.org/details/dli.ernet.504533',
     'Archive metadata does not state a reuse license; source-linked OCR for reading and review'),
    ('dli.ernet.510105', 'kaishrik-grammer', 'Kaishrik Grammer', 'Shok Shafiq',
     'Grammar', 'https://archive.org/details/dli.ernet.510105',
     'Archive metadata does not state a reuse license; source-linked OCR for reading and review'),
    ('8thkashmiritextbook', 'jkbose-class-8', 'Kashmiri Textbook for 8th Standard', 'JKBOSE',
     'Textbook', 'https://archive.org/details/8thkashmiritextbook',
     'Archive metadata does not state a reuse license; source-linked OCR for reading and review'),
    ('book-v-85-shrimad-bhagvad-geeta-kashmiri-translation-1933-pandit-krishna-joo-dhar',
     'gita-kashmiri-translation', 'Shrimad Bhagavad Gita · Kashmiri translation (1933)',
     'Pandit Krishna Joo Dhar', 'Translation',
     'https://archive.org/details/book-v-85-shrimad-bhagvad-geeta-kashmiri-translation-1933-pandit-krishna-joo-dhar',
     'Archive metadata does not state a reuse license; source-linked OCR for reading and review'),
    ('book-v-87-othello-kashmiri-translation-ghulam-nazir', 'othello-kashmiri-translation',
     'Othello · Kashmiri translation', 'Ghulam Nazir', 'Translation',
     'https://archive.org/details/book-v-87-othello-kashmiri-translation-ghulam-nazir',
     'Archive metadata does not state a reuse license; source-linked OCR for reading and review'),
    ('rAxf_raja-tarangini-kashmiri-translation-vol.-1-jk-culture-academy',
     'raja-tarangini-kashmiri-translation', 'Raja Tarangini · Kashmiri translation, volume 1',
     'Jammu and Kashmir Culture Academy', 'Translation',
     'https://archive.org/details/rAxf_raja-tarangini-kashmiri-translation-vol.-1-jk-culture-academy',
     'Archive metadata does not state a reuse license; source-linked OCR for reading and review'),
    ('JeYD_lole-gita-kashmiri-translation-mahishar-nath-raina', 'lole-gita-kashmiri-translation',
     'Lole Gita · Kashmiri translation', 'Mahishar Nath Raina', 'Translation',
     'https://archive.org/details/JeYD_lole-gita-kashmiri-translation-mahishar-nath-raina',
     'Archive metadata does not state a reuse license; source-linked OCR for reading and review'),
    ('book-v-96-sumran-kashmiri-hindu-poetry-with-english-translation-lale-rukh-press',
     'sumran-kashmiri-poetry', 'Sumran · Kashmiri Hindu poetry with English translation',
     'Lale Rukh Press', 'Translation and poetry',
     'https://archive.org/details/book-v-96-sumran-kashmiri-hindu-poetry-with-english-translation-lale-rukh-press',
     'Archive metadata does not state a reuse license; source-linked OCR for reading and review'),
    ('in.ernet.dli.2015.24175', 'grierson-dictionary-ocr',
     'A Dictionary of the Kashmiri Language (Grierson, 1932)', 'George A. Grierson',
     'Reference dictionary', 'https://archive.org/details/in.ernet.dli.2015.24175',
     'Archive metadata reports public domain; DSAL carries different dictionary terms; source-linked OCR for review'),
    ('dli.language.2243', 'koul-dli-ocr',
     'Kashmiri-English Dictionary for Second Language Learners',
     'Omkar N. Koul, Roop Krishen Bhat and S. N. Raina', 'Reference dictionary',
     'https://archive.org/details/dli.language.2243',
     'CC BY-NC 4.0 (Internet Archive metadata); source-linked OCR for reading and review'),
]

# New additions. Title/creator/licence are taken from the archive.org metadata API at
# build time; the literals here are offline fallbacks.
NEW_ITEMS = [
    ('zxUO_an-intensive-course-in-kashmiri-omkar-n-koul', 'intensive-course-kashmiri',
     'An Intensive Course in Kashmiri', 'Omkar N. Koul', 'Language course',
     'https://archive.org/details/zxUO_an-intensive-course-in-kashmiri-omkar-n-koul',
     'CC0 1.0 (public domain dedication)'),
    ('dli.language.2232', 'hindi-kashmiri-dictionary',
     'Hindi-Kashmiri dictionary', 'Jawaharlal Handoo and Lalita Handoo', 'Bilingual dictionary',
     'https://archive.org/details/dli.language.2232',
     'CC BY-NC 4.0'),
    ('wVzw_veth-mia-chi-shongith-a-collection-of-kashmiri-vakh-bimla-raina',
     'veth-mia-chi-shongith-vakh', 'Veth Mia Chi Shongith · a collection of Kashmiri vakh',
     'Bimla Raina', 'Proverbs',
     'https://archive.org/details/wVzw_veth-mia-chi-shongith-a-collection-of-kashmiri-vakh-bimla-raina',
     'CC0 1.0 (public domain dedication)'),
    ('Mady_lol-te-rehe-kashmiri-jawahar-lal-saroor', 'lol-te-rehe',
     'Lol Te Rehe', 'Jawahar Lal Saroor', 'Poetry',
     'https://archive.org/details/Mady_lol-te-rehe-kashmiri-jawahar-lal-saroor',
     'CC0 1.0 (public domain dedication)'),
    ('ygBP_kehwat-kashmiri-urdu-rehman-rahi', 'kehwat-rehman-rahi',
     'Kehwat', 'Rehman Rahi', 'Poetry',
     'https://archive.org/details/ygBP_kehwat-kashmiri-urdu-rehman-rahi',
     'CC0 1.0 (public domain dedication)'),
    ('eMNf_siya-rath-te-maete-khaab-a-collection-of-kashmiri-short-stories-by-hameeda-shah-',
     'siya-rath-te-maete-khaab',
     'Siya Rath Te Maete Khaab · a collection of Kashmiri short stories',
     'Hameeda Shah Akhter', 'Short stories',
     'https://archive.org/details/eMNf_siya-rath-te-maete-khaab-a-collection-of-kashmiri-short-stories-by-hameeda-shah-',
     'CC0 1.0 (public domain dedication)'),
    ('KashirGitanjaliKashmiriBySarvanandKoulPremiKashmiriJKCultureAcademy', 'kashir-gitanjali',
     'Kashir Gitanjali', 'Sarvanand Koul Premi', 'Poetry',
     'https://archive.org/details/KashirGitanjaliKashmiriBySarvanandKoulPremiKashmiriJKCultureAcademy',
     'CC0 1.0 (public domain dedication)'),
    # Additional typed Digital Library of India / Kashmir candidates measured against
    # the same gate.
    ('dli.ernet.504536', 'khabar-tagimi-wanoon', 'Khabar Tagimi Wanoon',
     'Zareef Ahmad Zareef', 'Prose', 'https://archive.org/details/dli.ernet.504536',
     'No reuse licence is stated in the archive.org metadata for this item'),
    ('dli.language.1685', 'kashmiri-phonetic-reader', 'Kashmiri Phonetic Reader',
     'Jawaharlal Handoo', 'Language course', 'https://archive.org/details/dli.language.1685',
     'No reuse licence is stated in the archive.org metadata for this item'),
    ('yaath-na-beqayi-haaba-by-gulam-nabi-baba-kashmiri-afsana-short-stories-kashmir-treasure',
     'yaath-na-beqayi-haaba', 'Yaath Na Beqayi Haaba · Kashmiri afsana (short stories)',
     'Gulam Nabi Baba', 'Short stories',
     'https://archive.org/details/yaath-na-beqayi-haaba-by-gulam-nabi-baba-kashmiri-afsana-short-stories-kashmir-treasure',
     'No reuse licence is stated in the archive.org metadata for this item'),
]

# archive.org stores this record's title text in its `creator` field; the poet named by
# the item and its identifier is Rehman Rahi, so the junk value is not repeated here.
CREATOR_OVERRIDES = {
    'ygBP_kehwat-kashmiri-urdu-rehman-rahi': 'Rehman Rahi',
}

ITEMS = [
    {
        'iaid': iaid, 'id': bid, 'title': title, 'creator': creator, 'category': category,
        'source': source, 'license': license_text, 'use_metadata': False,
    }
    for iaid, bid, title, creator, category, source, license_text in LEGACY_ITEMS
] + [
    {
        'iaid': iaid, 'id': bid, 'title': title, 'creator': creator, 'category': category,
        'source': source, 'license': license_text, 'use_metadata': True,
    }
    for iaid, bid, title, creator, category, source, license_text in NEW_ITEMS
]

# Review overrides. These items clear the numeric density/script gate but a manual
# reading of mid-book pages shows Nastaliq OCR word-salad rather than readable text,
# so they are rejected on review and the reason is recorded instead of silently
# importing them. Delete an entry here to let the numeric gate decide again.
REVIEW_REJECTS = {
    'siya-rath-te-maete-khaab': (
        'review override: mid-book pages are unreadable Nastaliq OCR word-salad '
        '(measured samples kept in the build report), so the item is rejected even '
        'though it clears the density and Arabic-share thresholds'
    ),
    'yaath-na-beqayi-haaba': (
        'review override: mid-book pages are unreadable Nastaliq OCR word-salad '
        '(measured samples kept in the build report), so the item is rejected even '
        'though it clears the density and Arabic-share thresholds'
    ),
}
for _item in ITEMS:
    if _item['id'] in REVIEW_REJECTS:
        _item['review_reject'] = REVIEW_REJECTS[_item['id']]


def clean_word(value):
    """Strip the direction marks and BOM that DjVu XML leaves in WORD text."""
    return (
        html.unescape(value or '')
        .replace('\u200e', '')
        .replace('\u200f', '')
        .replace('\ufeff', '')
        .strip()
    )


def extract_pages(path, book_id):
    """One {book,page,text} record per <OBJECT> (scanned page) in the DjVu XML."""
    root = ET.parse(path).getroot()
    records = []
    for index, obj in enumerate(root.findall('.//OBJECT'), 1):
        lines = []
        for line in obj.findall('.//LINE'):
            words = [w for w in (clean_word(word.text) for word in line.findall('.//WORD')) if w]
            if words:
                lines.append(' '.join(words))
        text = unicodedata.normalize('NFC', '\n'.join(lines)).strip()
        records.append({'book': book_id, 'page': index, 'text': text})
    return records


def fetch_metadata(iaid):
    request = urllib.request.Request(
        METADATA_URL.format(iaid=iaid),
        headers={'User-Agent': USER_AGENT, 'Accept': 'application/json'},
    )
    with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS) as response:
        return json.loads(response.read().decode('utf-8'))


def djvu_xml_file(metadata):
    """The archive.org metadata must name the DjVu XML file; never guess it."""
    candidates = [
        f for f in (metadata.get('files') or [])
        if str(f.get('name', '')).endswith('_djvu.xml')
    ]
    if not candidates:
        return None
    candidates.sort(key=lambda f: int(f.get('size') or 0), reverse=True)
    return candidates[0]


def download_djvu(iaid, name):
    """Download one DjVu XML file to source-ocr/reading/<iaid>.xml (atomic-ish)."""
    target = SOURCE_DIR / f'{iaid}.xml'
    partial = target.with_name(target.name + '.part')
    request = urllib.request.Request(
        DOWNLOAD_URL.format(iaid=iaid, name=urllib.parse.quote(name)),
        headers={'User-Agent': USER_AGENT},
    )
    with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS) as response, \
            open(partial, 'wb') as handle:
        shutil.copyfileobj(response, handle)
    size = partial.stat().st_size
    if size == 0:
        partial.unlink(missing_ok=True)
        raise RuntimeError(f'downloaded {name} was empty')
    partial.replace(target)
    return size


def normalise_license_url(url):
    value = str(url or '').strip().lower().replace('https://', 'http://')
    if value.endswith('/legalcode'):
        value = value[: -len('/legalcode')]
    if value and not value.endswith('/'):
        value += '/'
    return value


def license_string(metadata, fallback):
    """Never imply reuse rights: report what archive.org actually states."""
    meta = metadata.get('metadata') or {}
    url = meta.get('licenseurl') or ''
    if url:
        label = CC_LICENSE_LABELS.get(normalise_license_url(url))
        if label:
            return f'{label} · reported by archive.org ({url})'
        return f'{url} · licence URL reported by archive.org, not verified locally'
    rights = str(meta.get('rights') or '').strip()
    if rights:
        return f'Archive metadata rights field: {rights} (no reuse licence URL reported)'
    if fallback:
        return f'{fallback}; source-linked machine OCR for reading and review only.'
    return (
        'No reuse licence is stated in the archive.org metadata for this item; '
        'source-linked machine OCR for reading and review only.'
    )


def metadata_title(metadata):
    value = str((metadata.get('metadata') or {}).get('title') or '')
    return ' '.join(value.split())


def metadata_creator(metadata):
    value = (metadata.get('metadata') or {}).get('creator')
    if isinstance(value, (list, tuple)):
        value = ', '.join(' '.join(str(v).split()) for v in value if str(v).strip())
    return ' '.join(str(value or '').split())


def build_book(item):
    """Download what is missing, parse the DjVu XML, and return (book, pages, note)."""
    iaid, bid = item['iaid'], item['id']
    target = SOURCE_DIR / f'{iaid}.xml'
    metadata = None
    note = 'cached DjVu XML'

    def get_metadata():
        nonlocal metadata
        if metadata is None:
            metadata = fetch_metadata(iaid)
        return metadata

    if item.get('use_metadata'):
        get_metadata()

    if not (target.exists() and target.stat().st_size > 0):
        meta = get_metadata()
        entry = djvu_xml_file(meta)
        if entry is None:
            raise RuntimeError('archive.org metadata lists no *_djvu.xml file for this item')
        size = download_djvu(iaid, entry['name'])
        note = f"downloaded {entry['name']} ({size} bytes)"

    pages = extract_pages(target, bid)
    if not pages:
        raise RuntimeError('DjVu XML contained no <OBJECT> pages')

    title, creator, license_text = item['title'], item['creator'], item['license']
    if item.get('use_metadata'):
        meta = get_metadata()
        title = metadata_title(meta) or title
        creator = CREATOR_OVERRIDES.get(iaid) or metadata_creator(meta) or creator
        license_text = license_string(meta, item['license'])

    book = {
        'id': bid,
        'title': title,
        'creator': creator,
        'category': item['category'],
        'source': item['source'],
        'pages': len(pages),
        'license': license_text,
    }
    return book, pages, note


def txt_section(title, page_number, text):
    return f'\n===== {title} · PDF page {page_number} =====\n\n{text}\n'


def newline_for(path):
    """Match the line ending already on disk (git checks this repo out as CRLF)."""
    try:
        tail = path.read_bytes()[-2:]
    except OSError:
        return '\n'
    return '\r\n' if tail.endswith(b'\r\n') else '\n'


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        '--rebuild', action='store_true',
        help='ignore the existing payload and rebuild every book from scratch',
    )
    parser.add_argument(
        '--measure-only', action='store_true',
        help='download and measure every candidate, print the quality table, write nothing',
    )
    args = parser.parse_args(argv)

    SOURCE_DIR.mkdir(parents=True, exist_ok=True)
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)

    payload = None
    if not args.rebuild and JSON_OUT.exists():
        payload = json.loads(JSON_OUT.read_text(encoding='utf-8'))
        print(f'[build-reading-ocr] loaded existing payload: '
              f"{len(payload.get('books', []))} books, {len(payload.get('pages', []))} pages",
              file=sys.stderr)
    if payload is None:
        payload = dict(PAYLOAD_DEFAULTS)
        payload['books'] = []
        payload['pages'] = []

    books = payload.setdefault('books', [])
    pages = payload.setdefault('pages', [])
    existing_ids = {str(book.get('id')) for book in books}
    before = {'books': len(books), 'pages': len(pages), 'characters': sum(len(p.get('text', '')) for p in pages)}

    report = []
    appended_pages = []
    sections = []
    terminator = '\n' if args.rebuild else newline_for(TXT_OUT)

    for item in ITEMS:
        if item['id'] in existing_ids:
            report.append({'id': item['id'], 'iaid': item['iaid'], 'status': 'already-present'})
            continue
        try:
            book, book_pages, note = build_book(item)
        except (urllib.error.URLError, urllib.error.HTTPError, OSError, ET.ParseError,
                RuntimeError, ValueError, TimeoutError) as error:
            reason = f'{type(error).__name__}: {error}'
            print(f"[build-reading-ocr] SKIPPED {item['id']}: {reason}", file=sys.stderr)
            report.append({'id': item['id'], 'iaid': item['iaid'], 'status': 'skipped', 'reason': reason})
            continue

        metrics = measure_pages(book_pages)
        numeric_failures = gate_failures(item, metrics)
        review_reject = item.get('review_reject')
        entry = {
            'id': book['id'],
            'iaid': item['iaid'],
            'title': book['title'],
            'creator': book['creator'],
            'license': book['license'],
            'category': book['category'],
            'source': item['source'],
            'djvu': note,
            'numericGatePassed': not numeric_failures,
            'quality': metrics,
        }
        if numeric_failures or review_reject:
            # Measured, reported, and deliberately not imported: a weak text layer is
            # worse than no entry at all.
            reasons = numeric_failures + ([review_reject] if review_reject else [])
            print(f"[build-reading-ocr] REJECTED {book['id']}: {'; '.join(reasons)}", file=sys.stderr)
            entry['status'] = 'rejected'
            entry['reasons'] = reasons
            report.append(entry)
            continue

        if item.get('gate_exempt_reason'):
            entry['gateNote'] = item['gate_exempt_reason']

        if args.measure_only:
            entry['status'] = 'would-append'
            report.append(entry)
            continue

        books.append(book)
        pages.extend(book_pages)
        appended_pages.extend(book_pages)
        existing_ids.add(item['id'])
        for page in book_pages:
            sections.append(txt_section(book['title'], page['page'], page['text']).replace('\n', terminator))
        entry['status'] = 'appended'
        report.append(entry)

    if appended_pages:
        permission = str(payload.get('permission', '')).rstrip()
        if APPEND_PERMISSION_NOTE.strip() not in permission:
            payload['permission'] = permission + APPEND_PERMISSION_NOTE
    payload['books'] = books
    payload['pages'] = pages

    if not args.measure_only:
        JSON_OUT.write_text(
            json.dumps(payload, ensure_ascii=False, separators=(',', ':')) + '\n',
            encoding='utf-8', newline='',
        )
        if args.rebuild:
            TXT_OUT.write_text(''.join(sections), encoding='utf-8', newline='')
        elif sections:
            with open(TXT_OUT, 'a', encoding='utf-8', newline='') as handle:
                handle.write(''.join(sections))

    summary = {
        'mode': 'measure-only' if args.measure_only else ('rebuild' if args.rebuild else 'append'),
        'before': before,
        'after': {
            'books': len(books),
            'pages': len(pages),
            'characters': sum(len(p.get('text', '')) for p in pages),
        },
        'added': {
            'books': sum(1 for r in report if r['status'] == 'appended'),
            'pages': len(appended_pages),
        },
        'gate': {
            'minCharactersPerPage': MIN_CHARACTERS_PER_PAGE,
            'minArabicLetterShare': MIN_ARABIC_LETTER_SHARE,
            'rejected': sum(1 for r in report if r['status'] == 'rejected'),
            'skipped': sum(1 for r in report if r['status'] == 'skipped'),
        },
        'books': report,
        'json': str(JSON_OUT),
        'txt': str(TXT_OUT),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    sys.exit(main())
