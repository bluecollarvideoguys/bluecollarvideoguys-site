#!/usr/bin/env python3
"""Build The Blue Collar Video Guys Official Brand Guide PDF.

Recreates the Drive PDF structure with live home-page branding
(navy / gold / paper + current logo assets).
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
OUT = ROOT / "docs" / "BCVG-Official-Brand-Guide.pdf"

# Home page (v02) tokens
NAVY_DEEP = HexColor("#0D1520")
NAVY = HexColor("#111A26")
INK = HexColor("#16202D")
PAPER = HexColor("#F5F5F2")
GOLD = HexColor("#F2AE26")
GOLD_HOT = HexColor("#FFC64D")
GOLD_DEEP = HexColor("#BD7C00")
SLATE = HexColor("#64748B")
SLATE_LIGHT = HexColor("#94A3B8")

PAGE_W, PAGE_H = letter
MARGIN = 0.7 * inch


def try_register_fonts() -> tuple[str, str]:
    """Prefer system fonts close to Barlow Condensed + Inter."""
    display = "Helvetica-Bold"
    body = "Helvetica"
    candidates = [
        (
            "BCVGDisplay",
            [
                "/System/Library/Fonts/Supplemental/Impact.ttf",
                "/Library/Fonts/Arial Narrow Bold.ttf",
                "/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf",
            ],
        ),
        (
            "BCVGBody",
            [
                "/System/Library/Fonts/Supplemental/Arial.ttf",
                "/Library/Fonts/Arial.ttf",
                "/System/Library/Fonts/Helvetica.ttc",
            ],
        ),
    ]
    registered: dict[str, str] = {}
    for name, paths in candidates:
        for path in paths:
            p = Path(path)
            if not p.exists():
                continue
            try:
                pdfmetrics.registerFont(TTFont(name, str(p)))
                registered[name] = name
                break
            except Exception:
                continue
    return registered.get("BCVGDisplay", display), registered.get("BCVGBody", body)


DISPLAY, BODY = try_register_fonts()


def fill(c: canvas.Canvas, color: Color) -> None:
    c.setFillColor(color)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def gold_rule(c: canvas.Canvas, x: float, y: float, w: float = 1.1 * inch) -> None:
    c.setFillColor(GOLD)
    c.rect(x, y, w, 3, fill=1, stroke=0)


def eyebrow(c: canvas.Canvas, text: str, x: float, y: float, dark: bool = True) -> None:
    c.setFillColor(GOLD if dark else GOLD_DEEP)
    c.setFont(BODY, 9)
    c.drawString(x, y, text.upper())


def heading(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    size: float = 28,
    color: Color = white,
    max_width: float | None = None,
) -> float:
    c.setFillColor(color)
    c.setFont(DISPLAY, size)
    if max_width is None:
        c.drawString(x, y, text)
        return y - size * 1.15
    # crude wrap
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if c.stringWidth(trial, DISPLAY, size) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    yy = y
    for line in lines:
        c.drawString(x, yy, line)
        yy -= size * 1.05
    return yy


def body_text(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    size: float = 10.5,
    color: Color = SLATE_LIGHT,
    leading: float = 15,
) -> float:
    c.setFillColor(color)
    c.setFont(BODY, size)
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if c.stringWidth(trial, BODY, size) <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    yy = y
    for line in lines:
        c.drawString(x, yy, line)
        yy -= leading
    return yy


def draw_logo(
    c: canvas.Canvas,
    filename: str,
    cx: float,
    cy: float,
    max_w: float,
    max_h: float,
) -> None:
    path = BRAND / filename
    if not path.exists():
        return
    with PILImage.open(path) as im:
        iw, ih = im.size
    scale = min(max_w / iw, max_h / ih)
    w, h = iw * scale, ih * scale
    c.drawImage(
        str(path),
        cx - w / 2,
        cy - h / 2,
        width=w,
        height=h,
        mask="auto",
        preserveAspectRatio=True,
    )


def page_footer(c: canvas.Canvas, page: int, total: int = 7, dark: bool = True) -> None:
    c.setFillColor(SLATE_LIGHT if dark else SLATE)
    c.setFont(BODY, 8)
    c.drawString(MARGIN, 0.4 * inch, "The Blue Collar Video Guys™  ·  Official Brand Guide")
    c.drawRightString(PAGE_W - MARGIN, 0.4 * inch, f"{page} / {total}")


def cover(c: canvas.Canvas) -> None:
    fill(c, NAVY_DEEP)
    # gold glow
    c.setFillColor(Color(0.95, 0.68, 0.15, alpha=0.12))
    c.circle(PAGE_W * 0.78, PAGE_H * 0.72, 180, fill=1, stroke=0)

    eyebrow(c, "Official Brand Guide", MARGIN, PAGE_H - 1.15 * inch)
    gold_rule(c, MARGIN, PAGE_H - 1.35 * inch)

    y = heading(
        c,
        "THE BLUE COLLAR",
        MARGIN,
        PAGE_H - 2.2 * inch,
        size=42,
        color=white,
    )
    y = heading(c, "VIDEO GUYS™", MARGIN, y - 4, size=42, color=GOLD)

    c.setFillColor(white)
    c.setFont(BODY, 13)
    c.drawString(MARGIN, y - 28, "Build Trust. Stand Out. Win More Work.")

    body_text(
        c,
        "Media Team for the Trades. Built for the businesses that build America.",
        MARGIN,
        y - 52,
        PAGE_W - 2 * MARGIN - 2.8 * inch,
        size=11,
        color=SLATE_LIGHT,
        leading=16,
    )

    # circular badge
    draw_logo(
        c,
        "circular-badge.png",
        PAGE_W - MARGIN - 2.4 * inch,
        PAGE_H * 0.42,
        2.3 * inch,
        2.3 * inch,
    )

    draw_logo(c, "primary-horizontal.png", MARGIN, 0.85 * inch, 2.8 * inch, 0.7 * inch)
    page_footer(c, 1)
    c.showPage()


def foundation(c: canvas.Canvas) -> None:
    fill(c, NAVY)
    eyebrow(c, "01 — Brand Foundation", MARGIN, PAGE_H - 0.9 * inch)
    y = heading(
        c,
        "Built for the businesses that build America.",
        MARGIN,
        PAGE_H - 1.45 * inch,
        size=26,
        color=white,
        max_width=PAGE_W - 2 * MARGIN,
    )
    y = body_text(
        c,
        "The Blue Collar Video Guys is a video marketing and growth brand built specifically for the trades. We help established blue-collar businesses turn the reputation they have already earned into visible trust, stronger differentiation, and more opportunities.",
        MARGIN,
        y - 10,
        PAGE_W - 2 * MARGIN,
        size=11,
        color=SLATE_LIGHT,
        leading=16,
    )

    cards = [
        (
            "Brand Promise",
            "We do not create content just to get views. We create video marketing that builds trust, strengthens reputations, and helps blue-collar businesses grow.",
        ),
        ("Primary Tagline", "Build Trust. Stand Out. Win More Work."),
        ("Descriptor", "Media Team for the Trades"),
    ]
    card_w = (PAGE_W - 2 * MARGIN - 2 * 10) / 3
    card_h = 2.15 * inch
    top = y - 30
    for i, (title, copy) in enumerate(cards):
        x = MARGIN + i * (card_w + 10)
        c.setFillColor(NAVY_DEEP)
        c.rect(x, top - card_h, card_w, card_h, fill=1, stroke=0)
        c.setStrokeColor(Color(1, 1, 1, alpha=0.1))
        c.setLineWidth(0.8)
        c.rect(x, top - card_h, card_w, card_h, fill=0, stroke=1)
        eyebrow(c, title, x + 12, top - 22)
        body_text(
            c,
            copy,
            x + 12,
            top - 42,
            card_w - 24,
            size=9.5,
            color=SLATE_LIGHT,
            leading=13,
        )

    # Positioning panel
    panel_top = top - card_h - 28
    c.setFillColor(NAVY_DEEP)
    c.rect(MARGIN, 0.85 * inch, PAGE_W - 2 * MARGIN, panel_top - 0.85 * inch, fill=1, stroke=0)
    eyebrow(c, "02 — Positioning", MARGIN + 16, panel_top - 24)
    heading(
        c,
        "We help blue-collar businesses become the company people trust before they ever call.",
        MARGIN + 16,
        panel_top - 55,
        size=16,
        color=white,
        max_width=PAGE_W - 2 * MARGIN - 32,
    )
    body_text(
        c,
        'Our position is not "another video production company." We are the strategic media and marketing partner for companies whose reputation, craftsmanship, people, and proof deserve to be seen. The camera is a tool. Trust is the product.',
        MARGIN + 16,
        panel_top - 115,
        PAGE_W - 2 * MARGIN - 32,
        size=10,
        color=SLATE_LIGHT,
        leading=14,
    )
    page_footer(c, 2)
    c.showPage()


def blueprint(c: canvas.Canvas) -> None:
    fill(c, PAPER)
    eyebrow(c, "03 — The Blue Collar Blueprint™", MARGIN, PAGE_H - 0.9 * inch, dark=False)
    y = heading(
        c,
        "Build Trust. Stand Out. Win More Work.",
        MARGIN,
        PAGE_H - 1.4 * inch,
        size=24,
        color=INK,
        max_width=PAGE_W - 2 * MARGIN,
    )

    steps = [
        (
            "01",
            "Build Trust",
            "Show the people, craftsmanship, values, process, proof, and customer experience behind the company.",
        ),
        (
            "02",
            "Stand Out",
            "Create a recognizable premium brand and consistent media presence that separates the client from look-alike competitors.",
        ),
        (
            "03",
            "Win More Work",
            "Turn trust and differentiation into stronger leads, better-fit customers, recruiting advantages, referrals, and long-term brand equity.",
        ),
    ]
    col_w = (PAGE_W - 2 * MARGIN - 20) / 3
    top = y - 20
    for i, (num, title, copy) in enumerate(steps):
        x = MARGIN + i * (col_w + 10)
        c.setFillColor(GOLD)
        c.rect(x, top - 3, col_w * 0.35, 3, fill=1, stroke=0)
        c.setFillColor(GOLD)
        c.setFont(DISPLAY, 28)
        c.drawString(x, top - 40, num)
        c.setFillColor(INK)
        c.setFont(DISPLAY, 16)
        c.drawString(x, top - 62, title.upper())
        body_text(c, copy, x, top - 82, col_w - 4, size=9.5, color=SLATE, leading=13)

    # Trust Framework band
    band_h = 2.0 * inch
    c.setFillColor(NAVY)
    c.rect(MARGIN, 0.85 * inch, PAGE_W - 2 * MARGIN, band_h, fill=1, stroke=0)
    eyebrow(c, "04 — The Trust Framework™", MARGIN + 16, 0.85 * inch + band_h - 24)
    c.setFillColor(white)
    c.setFont(DISPLAY, 18)
    c.drawString(MARGIN + 16, 0.85 * inch + band_h - 55, "BUILD TRUST")
    c.setFillColor(GOLD)
    c.drawString(MARGIN + 16 + 115, 0.85 * inch + band_h - 55, "→")
    c.setFillColor(white)
    c.drawString(MARGIN + 16 + 135, 0.85 * inch + band_h - 55, "STAND OUT")
    c.setFillColor(GOLD)
    c.drawString(MARGIN + 16 + 245, 0.85 * inch + band_h - 55, "→")
    c.setFillColor(white)
    c.drawString(MARGIN + 16 + 265, 0.85 * inch + band_h - 55, "WIN MORE WORK")
    body_text(
        c,
        "The Trust Framework™ is the core philosophy that powers the Blue Collar Blueprint™. Every video, testimonial, website, social post, photograph, campaign, and sales asset should help move the client through these three outcomes.",
        MARGIN + 16,
        0.85 * inch + band_h - 85,
        PAGE_W - 2 * MARGIN - 32,
        size=10,
        color=SLATE_LIGHT,
        leading=14,
    )
    page_footer(c, 3, dark=False)
    c.showPage()


def logos_and_color(c: canvas.Canvas) -> None:
    fill(c, NAVY_DEEP)
    eyebrow(c, "05 — Logo System", MARGIN, PAGE_H - 0.85 * inch)
    heading(c, "Lockups that carry the crew", MARGIN, PAGE_H - 1.25 * inch, size=24)
    body_text(
        c,
        "The BC monogram, play symbol, roof form, proportions, and solid-border treatment stay consistent. Do not stretch, recolor, rearrange, or recreate the monogram as typed text.",
        MARGIN,
        PAGE_H - 1.55 * inch,
        PAGE_W - 2 * MARGIN,
        size=10,
        color=SLATE_LIGHT,
        leading=14,
    )

    logos = [
        ("primary-horizontal.png", "Primary"),
        ("alternate-horizontal.png", "Alternate"),
        ("compact-horizontal.png", "Compact"),
        ("primary-stacked.png", "Stacked"),
        ("badge-crest.png", "Crest"),
        ("circular-badge.png", "Circular"),
        ("icon-mark.png", "Icon"),
    ]
    cell_w = (PAGE_W - 2 * MARGIN - 20) / 4
    cell_h = 1.55 * inch
    start_y = PAGE_H - 2.0 * inch
    for i, (file, label) in enumerate(logos):
        col = i % 4
        row = i // 4
        x = MARGIN + col * (cell_w + 6.5)
        y = start_y - row * (cell_h + 18) - cell_h
        c.setFillColor(NAVY)
        c.rect(x, y, cell_w, cell_h, fill=1, stroke=0)
        c.setStrokeColor(Color(1, 1, 1, alpha=0.12))
        c.rect(x, y, cell_w, cell_h, fill=0, stroke=1)
        draw_logo(c, file, x + cell_w / 2, y + cell_h * 0.55, cell_w - 18, cell_h - 36)
        c.setFillColor(SLATE_LIGHT)
        c.setFont(BODY, 8)
        c.drawCentredString(x + cell_w / 2, y + 10, label)

    # Color strip
    eyebrow(c, "06 — Color Palette (Live Site)", MARGIN, 2.55 * inch)
    colors = [
        ("Navy Deep", "#0D1520", NAVY_DEEP),
        ("Navy", "#111A26", NAVY),
        ("Ink", "#16202D", INK),
        ("Paper", "#F5F5F2", PAPER),
        ("Gold", "#F2AE26", GOLD),
        ("Gold Hot", "#FFC64D", GOLD_HOT),
        ("Gold Deep", "#BD7C00", GOLD_DEEP),
        ("Slate", "#64748B", SLATE),
    ]
    sw = (PAGE_W - 2 * MARGIN - 7 * 6) / 8
    for i, (name, hexv, col) in enumerate(colors):
        x = MARGIN + i * (sw + 6)
        c.setFillColor(col)
        c.rect(x, 1.15 * inch, sw, 0.95 * inch, fill=1, stroke=0)
        c.setFillColor(white if name != "Paper" and name != "Gold Hot" else INK)
        if name in ("Paper", "Gold", "Gold Hot"):
            c.setFillColor(INK)
        else:
            c.setFillColor(white)
        c.setFont(BODY, 6.5)
        c.drawString(x + 4, 1.25 * inch, hexv)
        c.setFillColor(SLATE_LIGHT)
        c.setFont(BODY, 7)
        c.drawString(x, 0.95 * inch, name)

    page_footer(c, 4)
    c.showPage()


def mockups(c: canvas.Canvas) -> None:
    fill(c, PAPER)
    eyebrow(c, "14 — Logo Mockups", MARGIN, PAGE_H - 0.85 * inch, dark=False)
    heading(
        c,
        "How the mark shows up in the wild",
        MARGIN,
        PAGE_H - 1.25 * inch,
        size=22,
        color=INK,
    )
    body_text(
        c,
        "Application stills from the original brand board — apparel, vehicle, and social — using the current logo system.",
        MARGIN,
        PAGE_H - 1.55 * inch,
        PAGE_W - 2 * MARGIN,
        size=10,
        color=SLATE,
        leading=14,
    )

    strip = BRAND / "mockups" / "applications-strip.png"
    if strip.exists():
        with PILImage.open(strip) as im:
            iw, ih = im.size
        max_w = PAGE_W - 2 * MARGIN
        scale = max_w / iw
        sw, sh = max_w, ih * scale
        y = PAGE_H - 1.75 * inch - sh
        c.setFillColor(NAVY_DEEP)
        c.rect(MARGIN - 2, y - 2, sw + 4, sh + 4, fill=1, stroke=0)
        c.drawImage(str(strip), MARGIN, y, width=sw, height=sh, mask="auto")
        grid_top = y - 0.25 * inch
    else:
        grid_top = PAGE_H - 3.2 * inch

    items = [
        ("apparel-hat-photo.png", "Apparel", "Trucker hat embroidery"),
        ("vehicle-truck-photo.png", "Vehicle Decal", "Tailgate lockup"),
        ("social-profile-photo.png", "Social Profile", "Gold-ring avatar"),
        ("social-banner-photo.png", "Social Banner", "Cover + proof line"),
    ]
    gap = 10
    cell_w = (PAGE_W - 2 * MARGIN - gap) / 2
    cell_h = 2.15 * inch
    for i, (file, label, caption) in enumerate(items):
        col = i % 2
        row = i // 2
        x = MARGIN + col * (cell_w + gap)
        y = grid_top - (row + 1) * (cell_h + 14)
        path = BRAND / "mockups" / file
        c.setFillColor(white)
        c.setStrokeColor(Color(0.09, 0.13, 0.18, alpha=0.12))
        c.rect(x, y, cell_w, cell_h, fill=1, stroke=1)
        if path.exists():
            with PILImage.open(path) as im:
                iw, ih = im.size
            img_h = cell_h - 0.55 * inch
            scale = min((cell_w - 8) / iw, img_h / ih)
            dw, dh = iw * scale, ih * scale
            c.drawImage(
                str(path),
                x + (cell_w - dw) / 2,
                y + 0.48 * inch + (img_h - dh) / 2,
                width=dw,
                height=dh,
                mask="auto",
            )
        c.setFillColor(INK)
        c.setFont(DISPLAY, 11)
        c.drawString(x + 10, y + 0.28 * inch, label)
        c.setFillColor(SLATE)
        c.setFont(BODY, 8)
        c.drawString(x + 10, y + 0.12 * inch, caption)

    page_footer(c, 5, dark=False)
    c.showPage()


def type_voice(c: canvas.Canvas) -> None:
    fill(c, PAPER)
    eyebrow(c, "07 — Typography", MARGIN, PAGE_H - 0.9 * inch, dark=False)
    heading(c, "Condensed power. Clean body.", MARGIN, PAGE_H - 1.35 * inch, size=24, color=INK)
    body_text(
        c,
        "Display headlines use Barlow Condensed. Body and UI use Inter. The BC monogram is custom artwork, never typed text.",
        MARGIN,
        PAGE_H - 1.65 * inch,
        PAGE_W - 2 * MARGIN,
        size=10.5,
        color=SLATE,
        leading=14,
    )

    # Display sample card
    c.setFillColor(white)
    c.setStrokeColor(Color(0.09, 0.13, 0.18, alpha=0.12))
    c.rect(MARGIN, PAGE_H - 4.35 * inch, (PAGE_W - 2 * MARGIN - 12) / 2, 2.3 * inch, fill=1, stroke=1)
    c.setFillColor(GOLD_DEEP)
    c.setFont(BODY, 8)
    c.drawString(MARGIN + 14, PAGE_H - 2.25 * inch, "DISPLAY · BARLOW CONDENSED")
    c.setFillColor(INK)
    c.setFont(DISPLAY, 22)
    c.drawString(MARGIN + 14, PAGE_H - 2.65 * inch, "BUILD TRUST.")
    c.drawString(MARGIN + 14, PAGE_H - 2.95 * inch, "STAND OUT.")
    c.setFillColor(GOLD_DEEP)
    c.drawString(MARGIN + 14, PAGE_H - 3.25 * inch, "WIN MORE WORK.")

    # Body sample
    right = MARGIN + (PAGE_W - 2 * MARGIN - 12) / 2 + 12
    c.setFillColor(white)
    c.rect(right, PAGE_H - 4.35 * inch, (PAGE_W - 2 * MARGIN - 12) / 2, 2.3 * inch, fill=1, stroke=1)
    c.setFillColor(GOLD_DEEP)
    c.setFont(BODY, 8)
    c.drawString(right + 14, PAGE_H - 2.25 * inch, "BODY · INTER")
    body_text(
        c,
        "You've spent years earning your reputation. Our job is to make sure more people see it.",
        right + 14,
        PAGE_H - 2.6 * inch,
        (PAGE_W - 2 * MARGIN - 12) / 2 - 28,
        size=11,
        color=INK,
        leading=15,
    )

    # Voice
    eyebrow(c, "08 — Brand Voice", MARGIN, PAGE_H - 4.7 * inch, dark=False)
    heading(c, "A capable growth partner", MARGIN, PAGE_H - 5.1 * inch, size=20, color=INK)
    body_text(
        c,
        "Direct, confident, practical, grounded, and clear. Speak to business outcomes and reputation before cameras and gear.",
        MARGIN,
        PAGE_H - 5.4 * inch,
        PAGE_W - 2 * MARGIN,
        size=10,
        color=SLATE,
        leading=14,
    )

    use = [
        "Build trust. Stand out. Win more work.",
        "You've earned the reputation. We help people see it.",
        "Show the craftsmanship behind the company.",
        "Media Team for the Trades.",
    ]
    avoid = [
        "We make cool cinematic content.",
        "Marketing jargon and buzzwords.",
        "Overpromising leads, virality, or instant growth.",
        "Trying to sound like the contractor itself.",
    ]
    col_w = (PAGE_W - 2 * MARGIN - 14) / 2
    for i, (title, items, accent) in enumerate(
        [("USE", use, GOLD_DEEP), ("AVOID", avoid, SLATE)]
    ):
        x = MARGIN + i * (col_w + 14)
        c.setFillColor(white)
        c.rect(x, 0.85 * inch, col_w, 2.55 * inch, fill=1, stroke=1)
        c.setFillColor(accent)
        c.setFont(DISPLAY, 14)
        c.drawString(x + 12, 0.85 * inch + 2.25 * inch, title)
        yy = 0.85 * inch + 2.0 * inch
        for line in items:
            c.setStrokeColor(accent)
            c.setLineWidth(1.5)
            c.line(x + 12, yy + 4, x + 12, yy - 10)
            body_text(c, line, x + 20, yy, col_w - 36, size=9, color=SLATE, leading=12)
            yy -= 36

    page_footer(c, 6, dark=False)
    c.showPage()


def close_page(c: canvas.Canvas) -> None:
    fill(c, NAVY_DEEP)
    eyebrow(c, "11 — Core Messaging", MARGIN, PAGE_H - 0.9 * inch)
    lines = [
        "Trust Wins Jobs.",
        "Build Trust. Stand Out. Win More Work.",
        "Media Team for the Trades.",
        "Built for the businesses that build America.",
        "You've spent years earning your reputation. Our job is to make sure more people see it.",
    ]
    y = PAGE_H - 1.4 * inch
    for line in lines:
        c.setFillColor(white)
        c.setFont(DISPLAY, 16)
        # wrap long line
        if len(line) > 48:
            y = heading(c, line, MARGIN, y, size=14, color=white, max_width=PAGE_W - 2 * MARGIN)
            y -= 8
        else:
            c.drawString(MARGIN, y, line.upper() if line.endswith(".") and len(line) < 40 else line)
            y -= 28

    # Elevator
    c.setFillColor(NAVY)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.rect(MARGIN, 3.1 * inch, PAGE_W - 2 * MARGIN, 1.7 * inch, fill=1, stroke=1)
    eyebrow(c, "12 — Elevator Pitch", MARGIN + 16, 3.1 * inch + 1.4 * inch)
    body_text(
        c,
        "You've spent years earning your reputation. Our job is to make sure more people see it. Through the Blue Collar Blueprint™ and our Trust Framework™, we create authentic video marketing that helps blue-collar businesses build trust, stand out from the competition, and win more work.",
        MARGIN + 16,
        3.1 * inch + 1.1 * inch,
        PAGE_W - 2 * MARGIN - 32,
        size=10.5,
        color=SLATE_LIGHT,
        leading=15,
    )

    # North star
    eyebrow(c, "13 — North Star", MARGIN, 2.6 * inch)
    heading(
        c,
        "Does this help the client Build Trust, Stand Out, or Win More Work?",
        MARGIN,
        2.2 * inch,
        size=18,
        color=GOLD,
        max_width=PAGE_W - 2 * MARGIN,
    )
    body_text(
        c,
        "If it does, it belongs in the Blue Collar system. If it only looks cool but does not strengthen trust, differentiation, or business outcomes, it is not enough.",
        MARGIN,
        1.55 * inch,
        PAGE_W - 2 * MARGIN,
        size=10,
        color=SLATE_LIGHT,
        leading=14,
    )

    draw_logo(c, "compact-horizontal.png", PAGE_W / 2, 0.95 * inch, 2.2 * inch, 0.55 * inch)
    page_footer(c, 7)
    c.showPage()


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=letter)
    c.setTitle("The Blue Collar Video Guys™ — Official Brand Guide")
    c.setAuthor("The Blue Collar Video Guys™")
    cover(c)
    foundation(c)
    blueprint(c)
    logos_and_color(c)
    mockups(c)
    type_voice(c)
    close_page(c)
    c.save()
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
