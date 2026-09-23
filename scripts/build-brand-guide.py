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


FONT_DIRS = [
    Path.home() / "Library" / "Fonts",
    Path("/Library/Fonts"),
    Path("/System/Library/Fonts/Supplemental"),
]

# The brand type system: Barlow Condensed for display, Inter for body.
# Generic sans fallbacks only apply if the real families are not installed.
FONT_CANDIDATES = {
    "BCVGDisplay": (
        ["BarlowCondensed-Bold.ttf", "BarlowCondensed-SemiBold.ttf"],
        "Helvetica-Bold",
    ),
    "BCVGBody": (
        [
            "Inter-VariableFont_opsz,wght.ttf",
            "Inter-V.ttf",
            "Inter-Regular.ttf",
            "InterTight-VariableFont_wght.ttf",
        ],
        "Helvetica",
    ),
}


def try_register_fonts() -> tuple[str, str]:
    """Register the real brand fonts, falling back to generic sans."""
    resolved: dict[str, str] = {}
    for name, (filenames, fallback) in FONT_CANDIDATES.items():
        resolved[name] = fallback
        for filename in filenames:
            path = next(
                (d / filename for d in FONT_DIRS if (d / filename).exists()), None
            )
            if path is None:
                continue
            try:
                pdfmetrics.registerFont(TTFont(name, str(path)))
                resolved[name] = name
                break
            except Exception:
                continue
        if resolved[name] == fallback:
            print(f"WARNING: {name} not found, falling back to {fallback}")
    return resolved["BCVGDisplay"], resolved["BCVGBody"]


DISPLAY, BODY = try_register_fonts()


def fill(c: canvas.Canvas, color: Color) -> None:
    c.setFillColor(color)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def gold_rule(c: canvas.Canvas, x: float, y: float, w: float = 1.1 * inch) -> None:
    c.setFillColor(GOLD)
    c.rect(x, y, w, 3, fill=1, stroke=0)


# Site eyebrow spec: Inter 600, uppercase, tracking 0.18em
EYEBROW_TRACKING = 0.18
# Site display headings use Tailwind `tracking-tight`
HEADING_TRACKING = -0.025


def eyebrow(c: canvas.Canvas, text: str, x: float, y: float, dark: bool = True) -> None:
    color = GOLD if dark else GOLD_DEEP
    size = 9
    # Char spacing and render mode are graphics state and would otherwise
    # leak into every later text block, so keep them inside save/restore.
    c.saveState()
    c.setFillColor(color)
    # Only the Inter variable font is installed and it embeds at Regular, so
    # stroke the glyphs to approximate the site's semibold eyebrow.
    c.setStrokeColor(color)
    c.setLineWidth(size * 0.024)
    t = c.beginText(x, y)
    t.setFont(BODY, size)
    t.setCharSpace(size * EYEBROW_TRACKING)
    t.setTextRenderMode(2)  # fill + stroke
    t.textOut(text.upper())
    c.drawText(t)
    c.restoreState()


def tracked_width(
    c: canvas.Canvas, text: str, font: str, size: float, tracking: float
) -> float:
    return c.stringWidth(text, font, size) + tracking * size * max(len(text) - 1, 0)


def draw_tracked(
    c: canvas.Canvas, text: str, x: float, y: float, font: str, size: float, tracking: float
) -> None:
    c.saveState()
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setCharSpace(tracking * size)
    t.textOut(text)
    c.drawText(t)
    c.restoreState()


def heading(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    size: float = 28,
    color: Color = white,
    max_width: float | None = None,
    leading: float = 1.05,
    tracking: float = HEADING_TRACKING,
) -> float:
    c.setFillColor(color)
    c.setFont(DISPLAY, size)
    if max_width is None:
        draw_tracked(c, text, x, y, DISPLAY, size, tracking)
        return y - size * leading
    lines: list[str] = []
    cur = ""
    for w in text.split():
        trial = f"{cur} {w}".strip()
        if tracked_width(c, trial, DISPLAY, size, tracking) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    yy = y
    for line in lines:
        draw_tracked(c, line, x, yy, DISPLAY, size, tracking)
        yy -= size * leading
    return yy


def wrap_lines(
    c: canvas.Canvas,
    text: str,
    width: float,
    size: float,
    font: str | None = None,
) -> list[str]:
    font = font or BODY
    lines: list[str] = []
    cur = ""
    for w in text.split():
        trial = f"{cur} {w}".strip()
        if c.stringWidth(trial, font, size) <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def body_height(
    c: canvas.Canvas,
    text: str,
    width: float,
    size: float = 10.5,
    leading: float = 15,
) -> float:
    """Height a body_text block will occupy, so boxes can hug their content."""
    return len(wrap_lines(c, text, width, size)) * leading


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
    yy = y
    for line in wrap_lines(c, text, width, size):
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


def gold_glow(
    c: canvas.Canvas,
    cx: float,
    cy: float,
    radius: float,
    strength: float = 0.14,
) -> None:
    """Soft radial gold bloom, matching the hero glow on the live site.

    Stops blend gold into the navy ground rather than using alpha, so the
    falloff is smooth in print instead of a hard-edged disc.
    """
    steps = 28
    for i in range(steps, 0, -1):
        t = i / steps
        # ease-out falloff so the centre stays warm and the edge disappears
        mix = strength * (1 - t) ** 2
        c.setFillColor(
            Color(
                NAVY_DEEP.red + (GOLD.red - NAVY_DEEP.red) * mix,
                NAVY_DEEP.green + (GOLD.green - NAVY_DEEP.green) * mix,
                NAVY_DEEP.blue + (GOLD.blue - NAVY_DEEP.blue) * mix,
            )
        )
        c.circle(cx, cy, radius * t, fill=1, stroke=0)


def cover(c: canvas.Canvas) -> None:
    fill(c, NAVY_DEEP)
    gold_glow(c, PAGE_W * 0.82, PAGE_H * 0.74, 250)

    eyebrow(c, "Official Brand Guide", MARGIN, PAGE_H - 1.15 * inch)
    gold_rule(c, MARGIN, PAGE_H - 1.35 * inch)

    # Hero headline mirrors the site: leading-[0.9], tracking-tight
    y = heading(
        c,
        "THE BLUE COLLAR",
        MARGIN,
        PAGE_H - 2.2 * inch,
        size=42,
        color=white,
        leading=0.9,
    )
    y = heading(c, "VIDEO GUYS™", MARGIN, y, size=42, color=GOLD, leading=0.9)

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

    # draw_logo centers on cx, so offset by half the width to sit on the margin
    draw_logo(
        c,
        "primary-horizontal.png",
        MARGIN + 1.4 * inch,
        1.05 * inch,
        2.8 * inch,
        0.7 * inch,
    )
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
    card_h = 54 + max(
        body_height(c, copy, card_w - 24, size=9.5, leading=13) for _, copy in cards
    )
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

    # Positioning panel — height follows its own copy
    panel_top = top - card_h - 28
    panel_w = PAGE_W - 2 * MARGIN
    inner_w = panel_w - 32
    pos_head = "We help blue-collar businesses become the company people trust before they ever call."
    pos_body = 'Our position is not "another video production company." We are the strategic media and marketing partner for companies whose reputation, craftsmanship, people, and proof deserve to be seen. The camera is a tool. Trust is the product.'
    head_h = len(wrap_lines(c, pos_head, inner_w, 16, DISPLAY)) * 16 * 1.05
    panel_h = 40 + head_h + 18 + body_height(c, pos_body, inner_w, size=10, leading=14) + 20
    panel_bottom = panel_top - panel_h

    c.setFillColor(NAVY_DEEP)
    c.rect(MARGIN, panel_bottom, panel_w, panel_h, fill=1, stroke=0)
    eyebrow(c, "02 — Positioning", MARGIN + 16, panel_top - 24)
    hy = heading(
        c,
        pos_head,
        MARGIN + 16,
        panel_top - 48,
        size=16,
        color=white,
        max_width=inner_w,
    )
    body_text(
        c,
        pos_body,
        MARGIN + 16,
        hy - 12,
        inner_w,
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

    # Build Trust → Stand Out → Win More Work. Barlow Condensed has no
    # U+2192 glyph, so the connector is drawn as a vector arrow and the
    # steps are positioned from measured widths rather than fixed offsets.
    step_size = 18
    step_y = 0.85 * inch + band_h - 55
    x = MARGIN + 16
    steps = ["BUILD TRUST", "STAND OUT", "WIN MORE WORK"]
    for i, step in enumerate(steps):
        if i:
            arrow_w = 22
            mid = step_y + step_size * 0.3
            c.setStrokeColor(GOLD)
            c.setFillColor(GOLD)
            c.setLineWidth(1.6)
            c.line(x + 4, mid, x + arrow_w - 9, mid)
            head = c.beginPath()
            head.moveTo(x + arrow_w - 10, mid + 3.4)
            head.lineTo(x + arrow_w - 2, mid)
            head.lineTo(x + arrow_w - 10, mid - 3.4)
            head.close()
            c.drawPath(head, fill=1, stroke=0)
            x += arrow_w + 6
        c.setFillColor(white)
        draw_tracked(c, step, x, step_y, DISPLAY, step_size, HEADING_TRACKING)
        x += tracked_width(c, step, DISPLAY, step_size, HEADING_TRACKING) + 6
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
        "Three roles, two families. Display headlines use Barlow Condensed. Body, UI, and eyebrow titles use Inter. The BC monogram is custom artwork, never typed text.",
        MARGIN,
        PAGE_H - 1.65 * inch,
        PAGE_W - 2 * MARGIN,
        size=10.5,
        color=SLATE,
        leading=14,
    )

    half_w = (PAGE_W - 2 * MARGIN - 12) / 2
    card_top = PAGE_H - 2.05 * inch
    card_h = 1.85 * inch

    # Display sample card
    c.setFillColor(white)
    c.setStrokeColor(Color(0.09, 0.13, 0.18, alpha=0.12))
    c.rect(MARGIN, card_top - card_h, half_w, card_h, fill=1, stroke=1)
    eyebrow(c, "Display · Barlow Condensed", MARGIN + 14, card_top - 22, dark=False)
    c.setFillColor(INK)
    draw_tracked(c, "BUILD TRUST.", MARGIN + 14, card_top - 52, DISPLAY, 22, HEADING_TRACKING)
    draw_tracked(c, "STAND OUT.", MARGIN + 14, card_top - 74, DISPLAY, 22, HEADING_TRACKING)
    c.setFillColor(GOLD_DEEP)
    draw_tracked(c, "WIN MORE WORK.", MARGIN + 14, card_top - 96, DISPLAY, 22, HEADING_TRACKING)
    body_text(
        c,
        "Weights 500–800 · All-caps headlines · Tight tracking at large sizes",
        MARGIN + 14,
        card_top - card_h + 24,
        half_w - 28,
        size=8.5,
        color=SLATE,
        leading=11,
    )

    # Body sample
    right = MARGIN + half_w + 12
    c.setFillColor(white)
    c.rect(right, card_top - card_h, half_w, card_h, fill=1, stroke=1)
    eyebrow(c, "Body · Inter", right + 14, card_top - 22, dark=False)
    body_text(
        c,
        "You've spent years earning your reputation. Our job is to make sure more people see it.",
        right + 14,
        card_top - 52,
        half_w - 28,
        size=11,
        color=INK,
        leading=15,
    )
    body_text(
        c,
        "Weights 400–600 · Comfortable line height · No decorative italics",
        right + 14,
        card_top - card_h + 24,
        half_w - 28,
        size=8.5,
        color=SLATE,
        leading=11,
    )

    # Eyebrow titles card — documents the gold section labels
    eb_top = card_top - card_h - 14
    eb_intro = "Every section opens with a gold eyebrow title. It orients the reader before the headline lands, and it is the smallest piece of type carrying brand color."
    eb_inner_w = PAGE_W - 2 * MARGIN - 28
    swatch_h = 34
    spec_rows = 2
    eb_h = (
        30  # label
        + body_height(c, eb_intro, eb_inner_w, size=9.5, leading=13)
        + 16
        + swatch_h
        + 22
        + spec_rows * 13
        + 16
    )
    c.setFillColor(white)
    c.setStrokeColor(Color(0.09, 0.13, 0.18, alpha=0.12))
    c.rect(MARGIN, eb_top - eb_h, PAGE_W - 2 * MARGIN, eb_h, fill=1, stroke=1)
    eyebrow(c, "Eyebrow Titles · Inter", MARGIN + 14, eb_top - 22, dark=False)
    intro_end = body_text(
        c,
        eb_intro,
        MARGIN + 14,
        eb_top - 42,
        eb_inner_w,
        size=9.5,
        color=SLATE,
        leading=13,
    )

    # Live samples: the same eyebrow on paper and on navy
    sample_top = intro_end - 10
    sample_w = (eb_inner_w - 10) / 2
    c.setFillColor(PAPER)
    c.setStrokeColor(Color(0.09, 0.13, 0.18, alpha=0.12))
    c.rect(MARGIN + 14, sample_top - swatch_h, sample_w, swatch_h, fill=1, stroke=1)
    eyebrow(c, "06 — Color Palette", MARGIN + 26, sample_top - 21, dark=False)
    c.setFillColor(NAVY)
    c.rect(MARGIN + 24 + sample_w, sample_top - swatch_h, sample_w, swatch_h, fill=1, stroke=0)
    eyebrow(c, "01 — Brand Foundation", MARGIN + 36 + sample_w, sample_top - 21)

    specs = [
        "Family: Inter",
        "Weight: 600 semibold",
        "Size: 12px / 9pt in print",
        "Tracking: 0.18em",
        "Case: Uppercase",
        "Color: Gold on dark, Gold Deep on paper",
    ]
    spec_y = sample_top - swatch_h - 20
    spec_col_w = eb_inner_w / 3
    for i, spec in enumerate(specs):
        body_text(
            c,
            spec,
            MARGIN + 14 + (i % 3) * spec_col_w,
            spec_y - (i // 3) * 13,
            spec_col_w - 8,
            size=8.5,
            color=SLATE,
            leading=11,
        )

    # Voice
    voice_top = eb_top - eb_h - 0.28 * inch
    eyebrow(c, "08 — Brand Voice", MARGIN, voice_top, dark=False)
    heading(c, "A capable growth partner", MARGIN, voice_top - 30, size=20, color=INK)
    voice_body_y = body_text(
        c,
        "Direct, confident, practical, grounded, and clear. Speak to business outcomes and reputation before cameras and gear.",
        MARGIN,
        voice_top - 52,
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
    voice_col_top = voice_body_y - 16
    voice_col_h = voice_col_top - 0.75 * inch
    for i, (title, items, accent) in enumerate(
        [("USE", use, GOLD_DEEP), ("AVOID", avoid, SLATE)]
    ):
        x = MARGIN + i * (col_w + 14)
        c.setFillColor(white)
        c.setStrokeColor(Color(0.09, 0.13, 0.18, alpha=0.12))
        c.rect(x, voice_col_top - voice_col_h, col_w, voice_col_h, fill=1, stroke=1)
        c.setFillColor(accent)
        draw_tracked(c, title, x + 12, voice_col_top - 24, DISPLAY, 14, HEADING_TRACKING)
        yy = voice_col_top - 50
        for line in items:
            c.setStrokeColor(accent)
            c.setLineWidth(1.5)
            c.line(x + 12, yy + 4, x + 12, yy - 10)
            body_text(c, line, x + 20, yy, col_w - 36, size=9, color=SLATE, leading=12)
            yy -= 32

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
