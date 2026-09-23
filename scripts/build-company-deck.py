#!/usr/bin/env python3
"""Build a branded BCVG company intro deck, site copy and v02 styling."""

from __future__ import annotations

from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Inches, Pt

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "BCVG-Company-Introduction.pptx"
LOGO = ROOT / "public" / "brand" / "primary-horizontal.png"

# v02 tokens
NAVY_DEEP = RGBColor(0x0D, 0x15, 0x20)
NAVY = RGBColor(0x11, 0x1A, 0x26)
INK = RGBColor(0x16, 0x20, 0x2D)
PAPER = RGBColor(0xF5, 0xF5, 0xF2)
GOLD = RGBColor(0xF2, 0xAE, 0x26)
GOLD_HOT = RGBColor(0xFF, 0xC6, 0x4D)
GOLD_DEEP = RGBColor(0xBD, 0x7C, 0x00)
SLATE = RGBColor(0x64, 0x74, 0x8B)
SLATE_LIGHT = RGBColor(0x94, 0xA3, 0xB8)
SLATE_300 = RGBColor(0xCB, 0xD5, 0xE1)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
LINE = RGBColor(0xE2, 0xE8, 0xF0)
LINE_DARK = RGBColor(0x1E, 0x29, 0x3B)

FONT_DISPLAY = "Barlow Condensed"
FONT_BODY = "Inter"

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)


def set_run_font(run, *, name: str, size: Pt, bold: bool = False, color: RGBColor = WHITE, italic: bool = False):
    run.font.name = name
    run.font.size = size
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    rPr = run._r.get_or_add_rPr()
    for tag in ("latin", "ea", "cs"):
        el = rPr.find(qn(f"a:{tag}"))
        if el is None:
            el = rPr.makeelement(qn(f"a:{tag}"), {})
            rPr.append(el)
        el.set("typeface", name)


def rect(slide, left, top, width, height, color: RGBColor):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape


def add_textbox(slide, left, top, width, height):
    return slide.shapes.add_textbox(left, top, width, height)


def blank(prs, bg: RGBColor = NAVY_DEEP):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    rect(slide, 0, 0, SLIDE_W, SLIDE_H, bg)
    return slide


def footer(slide, page: str, *, dark: bool = True):
    rect(slide, 0, SLIDE_H - Inches(0.38), SLIDE_W, Inches(0.38), NAVY if dark else PAPER)
    box = add_textbox(slide, Inches(0.55), SLIDE_H - Inches(0.34), Inches(10), Inches(0.28))
    run = box.text_frame.paragraphs[0].add_run()
    run.text = "The Blue Collar Video Guys™  ·  bluecollarvideoguys.com"
    set_run_font(run, name=FONT_BODY, size=Pt(9), color=SLATE_LIGHT if dark else SLATE)
    num = add_textbox(slide, SLIDE_W - Inches(0.9), SLIDE_H - Inches(0.34), Inches(0.6), Inches(0.28))
    p = num.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.RIGHT
    run = p.add_run()
    run.text = page
    set_run_font(run, name=FONT_BODY, size=Pt(9), color=GOLD if dark else GOLD_DEEP)


def eyebrow(slide, left, top, text: str, *, light: bool = False):
    box = add_textbox(slide, left, top, Inches(11), Inches(0.3))
    run = box.text_frame.paragraphs[0].add_run()
    run.text = text.upper()
    set_run_font(
        run,
        name=FONT_BODY,
        size=Pt(11),
        bold=True,
        color=GOLD_DEEP if light else GOLD,
    )


def headline(slide, left, top, width, lines: list[str], *, light: bool = False, size=Pt(40)):
    box = add_textbox(slide, left, top, width, Inches(2.2))
    tf = box.text_frame
    tf.word_wrap = True
    color = INK if light else WHITE
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.space_after = Pt(2)
        run = p.add_run()
        run.text = line
        set_run_font(run, name=FONT_DISPLAY, size=size, bold=True, color=color if "WIN MORE" not in line else GOLD)


def body_text(slide, left, top, width, height, text: str, *, light: bool = False, size=Pt(15)):
    box = add_textbox(slide, left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    run = tf.paragraphs[0].add_run()
    run.text = text
    set_run_font(run, name=FONT_BODY, size=size, color=SLATE if light else SLATE_300)


def gold_band_stats(slide):
    rect(slide, 0, Inches(6.15), SLIDE_W, Inches(1.35), GOLD)
    stats = [
        ("01", "Build Trust"),
        ("02", "Stand Out"),
        ("03", "Win More Work"),
        ("™", "Trust Framework"),
    ]
    for i, (num, label) in enumerate(stats):
        left = Inches(0.55) + i * Inches(3.2)
        n = add_textbox(slide, left, Inches(6.35), Inches(1.2), Inches(0.55))
        run = n.text_frame.paragraphs[0].add_run()
        run.text = num
        set_run_font(run, name=FONT_DISPLAY, size=Pt(36), bold=True, color=INK)
        l = add_textbox(slide, left, Inches(6.95), Inches(2.8), Inches(0.35))
        run = l.text_frame.paragraphs[0].add_run()
        run.text = label.upper()
        set_run_font(run, name=FONT_BODY, size=Pt(10), bold=True, color=INK)


def pill(slide, left, top, text: str):
    w, h = Inches(3.35), Inches(0.42)
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, w, h)
    shape.fill.solid()
    shape.fill.fore_color.rgb = RGBColor(0x16, 0x20, 0x2D)
    shape.line.color.rgb = GOLD
    shape.line.width = Pt(1)
    tf = shape.text_frame
    tf.clear()
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = text.upper()
    set_run_font(run, name=FONT_BODY, size=Pt(10), bold=True, color=GOLD)


def outcome_card(slide, left, top, width, height, outcome: str, title: str, copy: str, *, paper: bool = True):
    fill = WHITE if paper else NAVY
    rect(slide, left, top, width, height, fill)
    if paper:
        rect(slide, left, top, width, Pt(1), LINE)
    eyebrow(slide, left + Inches(0.25), top + Inches(0.2), outcome, light=paper)
    t = add_textbox(slide, left + Inches(0.25), top + Inches(0.55), width - Inches(0.5), Inches(0.55))
    run = t.text_frame.paragraphs[0].add_run()
    run.text = title
    set_run_font(run, name=FONT_DISPLAY, size=Pt(18), bold=True, color=INK if paper else WHITE)
    b = add_textbox(slide, left + Inches(0.25), top + Inches(1.15), width - Inches(0.5), height - Inches(1.35))
    tf = b.text_frame
    tf.word_wrap = True
    run = tf.paragraphs[0].add_run()
    run.text = copy
    set_run_font(run, name=FONT_BODY, size=Pt(11), color=SLATE if paper else SLATE_LIGHT)


def build():
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H

    # ── 1. Cover (homepage hero) ─────────────────────────────
    s = blank(prs)
    rect(s, 0, 0, Inches(0.14), SLIDE_H, GOLD)
    if LOGO.exists():
        s.shapes.add_picture(str(LOGO), Inches(0.75), Inches(0.55), width=Inches(4.2))
    pill(s, Inches(0.75), Inches(1.55), "Marketing for Contractors")
    headline(
        s,
        Inches(0.75),
        Inches(2.15),
        Inches(11),
        ["BUILD TRUST.", "STAND OUT.", "WIN MORE WORK."],
        size=Pt(54),
    )
    body_text(
        s,
        Inches(0.75),
        Inches(4.35),
        Inches(9.5),
        Inches(0.9),
        "You've spent years earning your reputation. Our job is to make sure more people see it through The Blue Collar Blueprint™ and our Trust Framework™.",
        size=Pt(16),
    )
    proof = add_textbox(s, Inches(0.75), Inches(5.45), Inches(11), Inches(0.35))
    run = proof.text_frame.paragraphs[0].add_run()
    run.text = "TRUST WINS JOBS · NOT JUST ANOTHER VIDEO COMPANY · STRATEGIC GROWTH PARTNER"
    set_run_font(run, name=FONT_BODY, size=Pt(10), bold=True, color=SLATE_LIGHT)
    gold_band_stats(s)

    # ── 2. Why trust matters (Services) ──────────────────────
    s = blank(prs, PAPER)
    eyebrow(s, Inches(0.75), Inches(0.65), "Why trust matters", light=True)
    headline(
        s,
        Inches(0.75),
        Inches(1.05),
        Inches(11.5),
        ["PEOPLE DECIDE BEFORE THEY EVER DIAL YOUR NUMBER."],
        light=True,
        size=Pt(38),
    )
    body_text(
        s,
        Inches(0.75),
        Inches(2.55),
        Inches(11),
        Inches(1.4),
        "By the time a homeowner picks up the phone, they've already looked you up. They've checked your site, your reviews, your photos, and quietly decided whether you're the shop they trust. If the answer isn't yes before the call, the phone never rings at all.",
        light=True,
        size=Pt(17),
    )
    quote = add_textbox(s, Inches(0.75), Inches(4.35), Inches(10.5), Inches(0.8))
    tf = quote.text_frame
    tf.word_wrap = True
    rect(s, Inches(0.75), Inches(4.35), Pt(3), Inches(0.75), GOLD_DEEP)
    run = tf.paragraphs[0].add_run()
    run.text = "People don't hire the cheapest contractor. They hire the one they trust."
    set_run_font(run, name=FONT_BODY, size=Pt(16), bold=True, italic=True, color=INK)
    footer(s, "02", dark=False)

    # ── 3. Our Purpose (homepage) ────────────────────────────
    s = blank(prs, PAPER)
    eyebrow(s, Inches(0.75), Inches(0.65), "Our Purpose", light=True)
    headline(s, Inches(0.75), Inches(1.05), Inches(11), ["YOUR REPUTATION.", "YOUR STORY."], light=True, size=Pt(44))
    rect(s, Inches(0.75), Inches(2.55), Inches(0.65), Pt(2), LINE)
    body_text(
        s,
        Inches(0.75),
        Inches(2.85),
        Inches(11),
        Inches(1.0),
        "Blue Collar Video Guys helps you build trust through cinematic video and photography, websites that convert, SEO, and social media. No more hiding behind outdated sites and word of mouth alone.",
        light=True,
    )
    body_text(
        s,
        Inches(0.75),
        Inches(3.95),
        Inches(11),
        Inches(1.0),
        "We work with electricians, plumbers, HVAC techs, roofers, welders, and concrete crews across Southern Oregon and Northern California, from Medford to Sacramento. You're the backbone of America. It's time your marketing caught up to your craftsmanship.",
        light=True,
    )
    footer(s, "03", dark=False)

    # ── 4. Trust Framework (homepage) ────────────────────────
    s = blank(prs, WHITE)
    eyebrow(s, Inches(0.75), Inches(0.55), "The Trust Framework™", light=True)
    headline(s, Inches(0.75), Inches(0.95), Inches(11), ["OUR PROCESS. OUR PROMISE."], light=True, size=Pt(42))
    steps = [
        ("01", "Build Trust", "Earn confidence before the first phone call."),
        ("02", "Stand Out", "Become the obvious choice in your market."),
        ("03", "Win More Work", "Turn trust into leads, customers, and long-term growth."),
    ]
    for i, (num, title, desc) in enumerate(steps):
        left = Inches(0.75) + i * Inches(4.05)
        rect(s, left, Inches(2.35), Inches(3.75), Pt(2), LINE)
        n = add_textbox(s, left, Inches(2.55), Inches(1), Inches(0.5))
        run = n.text_frame.paragraphs[0].add_run()
        run.text = num
        set_run_font(run, name=FONT_DISPLAY, size=Pt(34), bold=True, color=GOLD)
        t = add_textbox(s, left, Inches(3.15), Inches(3.5), Inches(0.45))
        run = t.text_frame.paragraphs[0].add_run()
        run.text = title
        set_run_font(run, name=FONT_DISPLAY, size=Pt(22), bold=True, color=INK)
        d = add_textbox(s, left, Inches(3.65), Inches(3.5), Inches(0.8))
        run = d.text_frame.paragraphs[0].add_run()
        run.text = desc
        set_run_font(run, name=FONT_BODY, size=Pt(13), color=SLATE)
    footer(s, "04", dark=False)

    # ── 5. Blueprint (homepage panels) ───────────────────────
    s = blank(prs, NAVY)
    eyebrow(s, Inches(0.75), Inches(0.45), "The Blue Collar Blueprint™")
    headline(s, Inches(0.75), Inches(0.85), Inches(11), ["THREE STAGES. ONE PROMISE."], size=Pt(38))
    panels = [
        (
            "01 · Build Trust",
            "Trust First. Sale Second.",
            "Answer the questions every customer already asks: who you are, if you're experienced, if you care about quality. Brand stories, testimonials, crew films, education, culture. Trust you can see.",
            ["Brand story films", "Customer testimonials", "Meet-the-crew videos", "Educational & BTS content"],
        ),
        (
            "02 · Stand Out",
            "Get Noticed. Get Hired.",
            "Most shops look the same online. We help you separate with a clear brand, sharp footage, and a site that looks as solid as your work.",
            ["Cinematic project videos", "Professional photography", "Modern website design", "Social & monthly content"],
        ),
        (
            "03 · Win More Work",
            "More Trust. More Work.",
            "Stop competing on price alone. Attract better customers, earn referrals, and build brand value that compounds.",
            ["Better leads & bigger projects", "Referral systems", "Recruiting campaigns", "Long-term growth consulting"],
        ),
    ]
    for i, (label, title, copy, items) in enumerate(panels):
        left = Inches(0.55) + i * Inches(4.15)
        rect(s, left, Inches(2.05), Inches(3.95), Inches(4.55), NAVY_DEEP)
        rect(s, left, Inches(2.05), Pt(4), Inches(4.55), GOLD)
        eyebrow(s, left + Inches(0.2), Inches(2.25), label.split(" · ")[1] if " · " in label else label)
        n = add_textbox(s, left + Inches(0.2), Inches(2.55), Inches(3.5), Inches(0.35))
        run = n.text_frame.paragraphs[0].add_run()
        run.text = label.split(" · ")[0]
        set_run_font(run, name=FONT_DISPLAY, size=Pt(26), bold=True, color=GOLD)
        t = add_textbox(s, left + Inches(0.2), Inches(2.95), Inches(3.5), Inches(0.55))
        run = t.text_frame.paragraphs[0].add_run()
        run.text = title
        set_run_font(run, name=FONT_DISPLAY, size=Pt(18), bold=True, color=WHITE)
        b = add_textbox(s, left + Inches(0.2), Inches(3.55), Inches(3.55), Inches(1.35))
        tf = b.text_frame
        tf.word_wrap = True
        run = tf.paragraphs[0].add_run()
        run.text = copy
        set_run_font(run, name=FONT_BODY, size=Pt(10), color=SLATE_LIGHT)
        for j, item in enumerate(items):
            p = tf.add_paragraph() if j == 0 else tf.add_paragraph()
            p.space_before = Pt(4)
            run = p.add_run()
            run.text = f"✓  {item}"
            set_run_font(run, name=FONT_BODY, size=Pt(10), color=PAPER)
    footer(s, "05")

    # ── 6. Full Scope (Services, exact copy) ──────────────────
    s = blank(prs, PAPER)
    eyebrow(s, Inches(0.75), Inches(0.45), "Full Scope", light=True)
    headline(s, Inches(0.75), Inches(0.85), Inches(7), ["ONE CREW.", "EVERY TRADE YOU NEED."], light=True, size=Pt(36))
    body_text(
        s,
        Inches(7.5),
        Inches(1.05),
        Inches(5),
        Inches(1.2),
        "Every service ties back to one outcome: Build Trust, Stand Out, or Win More Work. Nothing on this list is filler.",
        light=True,
        size=Pt(13),
    )
    services = [
        ("Build Trust", "Cinematic Video and Photo", "Brand story films, project showcases, crew profiles, and photography that show your craftsmanship, not stock photos."),
        ("Stand Out", "Website Design", "A site that looks as solid as your work, built to turn visitors into discovery calls, not just page views."),
        ("Win More Work", "SEO", "Show up when local homeowners search for the trade you do best, before they ever find your competitor."),
        ("Stand Out", "Social Media", "Monthly content that keeps your crew, culture, and craftsmanship in front of the right people, consistently."),
        ("Win More Work", "Digital Marketing", "Strategy, ad management, and content planning that turns your story into a steady pipeline of the right jobs."),
    ]
    positions = [
        (Inches(0.55), Inches(2.2), Inches(4.0), Inches(1.55)),
        (Inches(4.65), Inches(2.2), Inches(4.0), Inches(1.55)),
        (Inches(8.75), Inches(2.2), Inches(4.0), Inches(1.55)),
        (Inches(0.55), Inches(3.85), Inches(4.0), Inches(1.55)),
        (Inches(4.65), Inches(3.85), Inches(4.0), Inches(1.55)),
    ]
    for (outcome, title, copy), (left, top, w, h) in zip(services, positions):
        outcome_card(s, left, top, w, h, outcome, title, copy, paper=True)
    # discovery call band
    rect(s, Inches(0.55), Inches(5.65), Inches(12.2), Inches(1.15), NAVY)
    rect(s, Inches(0.55), Inches(5.65), Inches(0.12), Inches(1.15), GOLD)
    eyebrow(s, Inches(0.85), Inches(5.82), "One call. One Blueprint.")
    t = add_textbox(s, Inches(0.85), Inches(6.12), Inches(5.5), Inches(0.45))
    run = t.text_frame.paragraphs[0].add_run()
    run.text = "NOT SURE WHAT YOU NEED?"
    set_run_font(run, name=FONT_DISPLAY, size=Pt(22), bold=True, color=WHITE)
    d = add_textbox(s, Inches(6.8), Inches(5.95), Inches(5.5), Inches(0.55))
    run = d.text_frame.paragraphs[0].add_run()
    run.text = "That's what the discovery call is for. We'll map the right mix for your business."
    set_run_font(run, name=FONT_BODY, size=Pt(12), color=SLATE_LIGHT)
    footer(s, "06", dark=False)

    # ── 7. Packages (Services, exact) ───────────────────────
    s = blank(prs, NAVY_DEEP)
    eyebrow(s, Inches(0.75), Inches(0.45), "The Blue Collar Blueprint™")
    headline(s, Inches(0.75), Inches(0.85), Inches(11), ["TRUST STRATEGY PACKAGES"], size=Pt(40))
    body_text(s, Inches(0.75), Inches(1.55), Inches(8), Inches(0.4), "Built for blue collar businesses.", size=Pt(14))
    packages = [
        (
            "Foundation",
            "3 Month",
            None,
            ["Trust Strategy", "Client Onboarding", "Pre-production planning", "3 Strategy Sessions"],
            ["1 Brand Message Video", "1 Promotional Video", "3 Testimonial Videos", "15 Branding Photos", "15 Social Reels"],
        ),
        (
            "Structure",
            "6 Month",
            "#BestDeal",
            ["6 Strategy Sessions", "1 Brand Message Video", "2 Promotional Videos", "4 Testimonial Videos", "30 Branding Photos", "30 Social Reels"],
            ["2 Sales Funnels", "Ad Management", "Ad Package (*$1,000 min ad spend required)"],
        ),
        (
            "Turnkey",
            "12 Month",
            None,
            ["12 Strategy Sessions", "1 Brand Message Video", "6 Promotional Videos", "4 Testimonial Videos", "3 Sales Funnels", "Ad Management", "Ad Package (*$4,000 min ad spend required)", "60 Branding Photos", "60 Social Reels"],
            ["Website + Hosting", "CRM Setup/Support", "CRM Manager", "Social Media Management"],
        ),
    ]
    for i, (tier, duration, badge, includes, plus) in enumerate(packages):
        left = Inches(0.55) + i * Inches(4.15)
        featured = badge == "#BestDeal"
        rect(s, left, Inches(2.05), Inches(3.95), Inches(4.55), INK if featured else NAVY)
        if badge:
            b = add_textbox(s, left + Inches(0.2), Inches(2.2), Inches(3.5), Inches(0.25))
            run = b.text_frame.paragraphs[0].add_run()
            run.text = badge.upper()
            set_run_font(run, name=FONT_BODY, size=Pt(9), bold=True, color=GOLD)
        t = add_textbox(s, left + Inches(0.2), Inches(2.5), Inches(3.5), Inches(0.45))
        run = t.text_frame.paragraphs[0].add_run()
        run.text = tier
        set_run_font(run, name=FONT_DISPLAY, size=Pt(26), bold=True, color=WHITE)
        d = add_textbox(s, left + Inches(0.2), Inches(3.0), Inches(3.5), Inches(0.3))
        run = d.text_frame.paragraphs[0].add_run()
        run.text = duration
        set_run_font(run, name=FONT_BODY, size=Pt(11), bold=True, color=GOLD)
        inc = add_textbox(s, left + Inches(0.2), Inches(3.35), Inches(3.55), Inches(1.5))
        tf = inc.text_frame
        tf.word_wrap = True
        for j, item in enumerate(includes[:6]):
            p = tf.paragraphs[0] if j == 0 else tf.add_paragraph()
            p.space_after = Pt(2)
            run = p.add_run()
            run.text = f"• {item}"
            set_run_font(run, name=FONT_BODY, size=Pt(9), color=SLATE_LIGHT)
        if plus:
            p = tf.add_paragraph()
            p.space_before = Pt(6)
            run = p.add_run()
            run.text = "PLUS"
            set_run_font(run, name=FONT_BODY, size=Pt(8), bold=True, color=GOLD)
            for item in plus[:3]:
                p = tf.add_paragraph()
                run = p.add_run()
                run.text = f"• {item}"
                set_run_font(run, name=FONT_BODY, size=Pt(9), color=PAPER)
    footer(s, "07")

    # ── 8. Video Trifecta (Services) ─────────────────────────
    s = blank(prs, NAVY_DEEP)
    eyebrow(s, Inches(0.75), Inches(0.45), "Video Trifecta")
    headline(s, Inches(0.75), Inches(0.85), Inches(11), ["VIDEO THAT EARNS TRUST."], size=Pt(42))
    body_text(
        s,
        Inches(0.75),
        Inches(1.65),
        Inches(10),
        Inches(0.7),
        "Brand video, promo video, and client testimonial. Together they earn trust before the phone rings, so buyers already believe you when they call.",
        size=Pt(14),
    )
    trifecta = [
        ("01", "Brand Video", "Your reputation, on film.", "A cinematic brand film with founder and crew on camera, real job-site footage, and a clear through-line about how the company works and what clients can count on."),
        ("02", "Promo Video", "One offer that actually converts.", "A sharp promo cut focused on a single offer or project type. Problem, process, and payoff, sized for ads, landing pages, and social."),
        ("03", "Client Testimonial", "Proof from someone who already hired you.", "A client testimonial film with a real customer, a real project, and an honest look at the experience from first call to final walkthrough."),
    ]
    for i, (num, trade, title, build) in enumerate(trifecta):
        top = Inches(2.55) + i * Inches(1.45)
        rect(s, Inches(0.75), top, Inches(11.8), Inches(1.3), NAVY)
        rect(s, Inches(0.75), top, Pt(4), Inches(1.3), GOLD)
        n = add_textbox(s, Inches(1.05), top + Inches(0.15), Inches(0.6), Inches(0.4))
        run = n.text_frame.paragraphs[0].add_run()
        run.text = num
        set_run_font(run, name=FONT_DISPLAY, size=Pt(22), bold=True, color=GOLD)
        tr = add_textbox(s, Inches(1.05), top + Inches(0.5), Inches(2.5), Inches(0.25))
        run = tr.text_frame.paragraphs[0].add_run()
        run.text = trade.upper()
        set_run_font(run, name=FONT_BODY, size=Pt(9), bold=True, color=GOLD)
        t = add_textbox(s, Inches(2.8), top + Inches(0.15), Inches(9.5), Inches(0.35))
        run = t.text_frame.paragraphs[0].add_run()
        run.text = title
        set_run_font(run, name=FONT_DISPLAY, size=Pt(18), bold=True, color=WHITE)
        b = add_textbox(s, Inches(2.8), top + Inches(0.55), Inches(9.5), Inches(0.65))
        tf = b.text_frame
        tf.word_wrap = True
        run = tf.paragraphs[0].add_run()
        run.text = build
        set_run_font(run, name=FONT_BODY, size=Pt(11), color=SLATE_LIGHT)
    footer(s, "08")

    # ── 9. Clear Advantage (homepage) ────────────────────────
    s = blank(prs, INK)
    eyebrow(s, Inches(0.75), Inches(0.45), "Clear Advantage")
    headline(s, Inches(0.75), Inches(0.85), Inches(11), ["WE DON'T SELL VIDEOS.", "WE BUILD TRUST."], size=Pt(38))
    rect(s, Inches(0.75), Inches(2.15), Inches(11.8), Pt(1), LINE_DARK)
    diffs = [
        ("Most agencies sell attention", "We build trust: content that earns confidence before anyone picks up the phone."),
        ("Most video shops sell footage", "We create business growth. Every piece is built to move you through the Blueprint."),
        ("Built for established shops", "Quality work. Strong reputation. Marketing as an investment, not a miracle for startups with no track record."),
        ("Strategic growth partner", "We don't chase trends. We tell authentic stories, because stories create trust, and trust wins jobs."),
    ]
    for i, (title, desc) in enumerate(diffs):
        col = i % 2
        row = i // 2
        left = Inches(0.75) + col * Inches(6.0)
        top = Inches(2.45) + row * Inches(1.85)
        if col == 0 and row < 2:
            rect(s, left + Inches(5.85), top, Pt(1), Inches(1.55), LINE_DARK)
        if row == 0:
            rect(s, left, top + Inches(1.65), Inches(5.7), Pt(1), LINE_DARK)
        t = add_textbox(s, left, top + Inches(0.1), Inches(5.4), Inches(0.4))
        run = t.text_frame.paragraphs[0].add_run()
        run.text = title
        set_run_font(run, name=FONT_DISPLAY, size=Pt(18), bold=True, color=WHITE)
        d = add_textbox(s, left, top + Inches(0.55), Inches(5.4), Inches(0.9))
        tf = d.text_frame
        tf.word_wrap = True
        run = tf.paragraphs[0].add_run()
        run.text = desc
        set_run_font(run, name=FONT_BODY, size=Pt(12), color=SLATE_LIGHT)
    footer(s, "09")

    # ── 10. Proven Results (homepage) ────────────────────────
    s = blank(prs, PAPER)
    eyebrow(s, Inches(0.75), Inches(0.45), "Proven Results", light=True)
    headline(s, Inches(0.75), Inches(0.85), Inches(11), ["REAL JOBS. REAL PROOF."], light=True, size=Pt(40))
    sub = add_textbox(s, Inches(0.75), Inches(1.55), Inches(8), Inches(0.3))
    run = sub.text_frame.paragraphs[0].add_run()
    run.text = "CLIENT FILMS AND TESTIMONIALS"
    set_run_font(run, name=FONT_BODY, size=Pt(11), bold=True, color=SLATE)
    videos = [
        ("Promo video", "youtube.com/watch?v=ss-3eS8oCTs"),
        ("Testimonial", "youtube.com/watch?v=jzdRmbzji-A"),
        ("Testimonials", "youtube.com/watch?v=emhLh58qP94"),
        ("Hero reel", "youtu.be/7gGRBMdAQ2k"),
    ]
    for i, (label, url) in enumerate(videos):
        top = Inches(2.2) + i * Inches(0.85)
        rect(s, left := Inches(0.75), top, Inches(11.8), Inches(0.72), WHITE)
        rect(s, left, top, Pt(3), Inches(0.72), GOLD)
        l = add_textbox(s, left + Inches(0.25), top + Inches(0.18), Inches(2.5), Inches(0.35))
        run = l.text_frame.paragraphs[0].add_run()
        run.text = label
        set_run_font(run, name=FONT_DISPLAY, size=Pt(16), bold=True, color=INK)
        u = add_textbox(s, left + Inches(3.0), top + Inches(0.18), Inches(8.3), Inches(0.35))
        run = u.text_frame.paragraphs[0].add_run()
        run.text = url
        set_run_font(run, name=FONT_BODY, size=Pt(12), color=GOLD_DEEP)
    trades = "ELECTRICIANS · PLUMBERS · HVAC · ROOFERS · PAINTERS · WELDERS · CONCRETE CREWS · MECHANICS · EXCAVATORS · CONTRACTORS · CARPENTERS · LANDSCAPERS · MASONS · DRYWALL · FLOORING · INSULATION"
    rect(s, 0, Inches(5.85), SLIDE_W, Inches(0.55), NAVY_DEEP)
    t = add_textbox(s, Inches(0.55), Inches(6.0), Inches(12.2), Inches(0.35))
    run = t.text_frame.paragraphs[0].add_run()
    run.text = trades
    set_run_font(run, name=FONT_BODY, size=Pt(9), bold=True, color=GOLD)
    footer(s, "10", dark=False)

    # ── 11. About (Contact page) ─────────────────────────────
    s = blank(prs, NAVY)
    eyebrow(s, Inches(0.75), Inches(0.45), "About us")
    headline(s, Inches(0.75), Inches(0.85), Inches(11), ["BUILT FOR THE TRADES."], size=Pt(42))
    about = [
        "Blue Collar Video Guys was founded by Anthony Fowler and Kathy Coker, two filmmakers with nearly a decade of hands-on experience telling brands' stories on camera. That experience runs deep in brand messaging videos and the digital marketing strategy to get them seen.",
        "The name says it all: we bring a blue-collar work ethic to video production. Show up, do the job right, and treat every client's business like our own. No jargon, no smoke and mirrors. Just honest work and a finished product that actually sounds like you.",
        "Ready to tell your story? Let's get to work.",
    ]
    top = Inches(1.75)
    for para in about:
        b = add_textbox(s, Inches(0.75), top, Inches(11.5), Inches(0.9))
        tf = b.text_frame
        tf.word_wrap = True
        run = tf.paragraphs[0].add_run()
        run.text = para
        set_run_font(run, name=FONT_BODY, size=Pt(15), color=SLATE_300)
        top += Inches(1.05)
    footer(s, "11")

    # ── 12. Close (Services CTA + footer) ────────────────────
    s = blank(prs, NAVY)
    if LOGO.exists():
        s.shapes.add_picture(str(LOGO), SLIDE_W - Inches(2.2), Inches(0.35), width=Inches(1.6))
    eyebrow(s, Inches(0.75), Inches(0.55), "Ready to break ground?")
    t1 = add_textbox(s, Inches(0.75), Inches(1.0), Inches(11), Inches(0.7))
    run = t1.text_frame.paragraphs[0].add_run()
    run.text = "YOUR STORY"
    set_run_font(run, name=FONT_DISPLAY, size=Pt(48), bold=True, color=WHITE)
    t2 = add_textbox(s, Inches(0.75), Inches(1.75), Inches(11), Inches(0.7))
    run = t2.text_frame.paragraphs[0].add_run()
    run.text = "DESERVES TO BE TOLD."
    set_run_font(run, name=FONT_DISPLAY, size=Pt(48), bold=True, color=SLATE_LIGHT)
    # second line muted effect - override second line color
    box = add_textbox(s, Inches(0.75), Inches(2.55), Inches(11), Inches(0.7))
    run = box.text_frame.paragraphs[0].add_run()
    run.text = "You've spent years earning your reputation. Let's build the trust system that turns it into more of the right work."
    set_run_font(run, name=FONT_BODY, size=Pt(15), color=SLATE_LIGHT)
    eyebrow(s, Inches(0.75), Inches(3.55), "Let's talk")
    t = add_textbox(s, Inches(0.75), Inches(3.95), Inches(11), Inches(0.45))
    run = t.text_frame.paragraphs[0].add_run()
    run.text = "ONE CALL. ONE BLUEPRINT."
    set_run_font(run, name=FONT_DISPLAY, size=Pt(28), bold=True, color=WHITE)
    body_text(
        s,
        Inches(0.75),
        Inches(4.45),
        Inches(10),
        Inches(0.5),
        "Tell us about your business and we'll set up a free call to map out your Blueprint. No pressure, no obligation.",
        size=Pt(14),
    )
    contacts = [
        ("Book a Discovery Call", "calendly.com/bluecollarvideoguys/30min"),
        ("Phone", "(530) 500-0201"),
        ("Email", "build@bluecollarvideoguys.com"),
        ("Website", "bluecollarvideoguys.com"),
    ]
    for i, (label, value) in enumerate(contacts):
        left = Inches(0.75) + i * Inches(3.05)
        rect(s, left, Inches(5.25), Inches(2.85), Inches(0.95), NAVY_DEEP)
        rect(s, left, Inches(5.25), Inches(2.85), Pt(2), GOLD)
        l = add_textbox(s, left + Inches(0.2), Inches(5.4), Inches(2.5), Inches(0.25))
        run = l.text_frame.paragraphs[0].add_run()
        run.text = label.upper()
        set_run_font(run, name=FONT_BODY, size=Pt(9), bold=True, color=GOLD)
        v = add_textbox(s, left + Inches(0.2), Inches(5.68), Inches(2.5), Inches(0.35))
        run = v.text_frame.paragraphs[0].add_run()
        run.text = value
        set_run_font(run, name=FONT_BODY, size=Pt(11), color=PAPER)
    stats = [("3", "Blueprint stages"), ("100%", "Built for the trades"), ("10", "Years experience")]
    for i, (num, label) in enumerate(stats):
        left = Inches(0.75) + i * Inches(2.8)
        rect(s, left, Inches(6.35), Inches(2.4), Pt(1), LINE_DARK)
        n = add_textbox(s, left, Inches(6.45), Inches(1.2), Inches(0.45))
        run = n.text_frame.paragraphs[0].add_run()
        run.text = num
        set_run_font(run, name=FONT_DISPLAY, size=Pt(28), bold=True, color=WHITE)
        l = add_textbox(s, left, Inches(6.9), Inches(2.4), Inches(0.25))
        run = l.text_frame.paragraphs[0].add_run()
        run.text = label.upper()
        set_run_font(run, name=FONT_BODY, size=Pt(8), bold=True, color=SLATE_LIGHT)
    tag = add_textbox(s, Inches(0.75), Inches(7.05), Inches(11), Inches(0.25))
    run = tag.text_frame.paragraphs[0].add_run()
    run.text = "Build Trust. Stand Out. Win More Work. Authentic video marketing for blue-collar businesses."
    set_run_font(run, name=FONT_BODY, size=Pt(9), color=SLATE_LIGHT)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
