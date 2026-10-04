#!/usr/bin/env python3
"""Render PDF pages to PNG images for OCR, using pypdfium2.

The JKBOSE Kashmiri textbooks are scan-only PDFs with no text layer, so they must
be rasterised and OCR'd. pypdfium2 bundles PDFium in a wheel, so no poppler or
Ghostscript install is needed.

An earlier attempt to pull the embedded JPEG streams straight out of the PDF byte
stream did not work: the page images are not adjacent to their /DCTDecode filter
entry, so only small decorative thumbnails were recovered. Rendering is the
reliable route.

Usage:  python scripts/render-pdf-pages.py INPUT.pdf OUTPUT_DIR PREFIX [SCALE]
        SCALE 1.0 is 72 dpi; 3.0 is about 216 dpi, a good OCR default.
"""
import sys
from pathlib import Path

import pypdfium2 as pdfium


def render(pdf_path, out_dir, prefix, scale=3.0):
    document = pdfium.PdfDocument(pdf_path)
    out_dir.mkdir(parents=True, exist_ok=True)
    written = []
    for index in range(len(document)):
        page = document[index]
        image = page.render(scale=scale).to_pil()
        target = out_dir / f"{prefix}-{index + 1:04d}.png"
        image.save(target)
        written.append(target)
    return len(document), written


if __name__ == "__main__":
    if len(sys.argv) < 4:
        raise SystemExit("Usage: python scripts/render-pdf-pages.py INPUT.pdf OUTPUT_DIR PREFIX [SCALE]")
    pdf, out, pre = sys.argv[1], Path(sys.argv[2]), sys.argv[3]
    scale = float(sys.argv[4]) if len(sys.argv) > 4 else 3.0
    pages, written = render(pdf, out, pre, scale)
    total = sum(p.stat().st_size for p in written)
    print(f"{pdf}: {pages} pages rendered at scale {scale} -> {out} ({total / 1048576:.1f} MB)")
