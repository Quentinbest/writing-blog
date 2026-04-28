# Design System — 日新笔记 / Quentin

## Product Context

- **What this is:** A bilingual personal tech blog (Simplified Chinese default, English secondary) by **Quentin**, published under the literary name **日新笔记** (*notes, renewing daily*).
- **Name origin:** **日新** is from the *Daxue* (《大学》) classic — *苟日新，日日新，又日新* ("if today is new, then daily anew, and again anew") — a Confucian phrase about continuous self-renewal. It's a deliberate choice for a tech blog because servers, AI, and home infrastructure demand exactly this kind of daily learning. The name is the thesis.
- **Brand pairing:**
  - Chinese: **日新笔记** (the work)
  - English: **Quentin** (the author)
  - This separation is intentional: the Chinese brand carries literary identity; the English brand carries personal voice. Don't translate 日新笔记 to English ("Renewal Notes" etc.) — the gloss kills the resonance. Use *Quentin* in English contexts, *日新笔记* in Chinese contexts, *日新笔记 · Quentin* together when both must appear.
- **Who it's for:** Engineers and curious readers (Chinese-first, English-fluent) who care about home infrastructure, AI thinking, and careful writing.
- **Space:** Personal tech blogs. Peers: Maggie Appleton, Robin Sloan, Julia Evans, Stephan Ango (kepano), 谢益辉 (Yihui), Linus Lee.
- **Project type:** Editorial / long-form bilingual technical blog. Hugo-built, GitHub Pages deployed.

## Aesthetic Direction

- **Direction:** **Engineer's notebook, late evening.** Warm paper, careful typography, a single vermillion seal. Closer to a Japanese literary journal × Plan 9 terminal than to any SaaS template.
- **Decoration level:** intentional — subtle paper grain, no decorative blobs.
- **Mood:** the quiet energy of someone who actually configures servers and writes about it. Bookish. Tactile. Domestic. NOT minimal-tech, NOT dark-terminal, NOT corporate-blog.
- **Three-second emotional reaction target:** stillness — the feeling of opening a hardcover book in a quiet room.
- **Memorable thing (the one thing):** *feels like a person, not a publication.*
- **Reference sites researched:** maggieappleton.com, robinsloan.com, jvns.ca, yihui.org, stephango.com.
- **Lane:** warm-personal × CJK-first × technical-tutorial. This intersection is rare — own it.

## Typography

### Stack by role

| Role | Chinese | English | Notes |
|---|---|---|---|
| Display / headings | **Noto Serif SC** (Source Han Serif SC), 700–900 | **Source Serif 4** (display optical), 700 | Same Adobe Source family designer; pair by construction |
| Body | **LXGW WenKai** (霞鹜文楷) | **Source Serif 4 Text**, 400–500 | Serif throughout — including in tutorials |
| UI / metadata / nav | **Source Sans 3**, 500 small-caps | (same) | Only sans on the page; sparingly |
| Code | **JetBrains Mono**, 400–500 | (same) | Free; consider Berkeley Mono as paid upgrade |

### Loading

```html
<!-- Bunny Fonts (privacy-respecting, GDPR) -->
<link rel="preconnect" href="https://fonts.bunny.net">
<link href="https://fonts.bunny.net/css?family=source-serif-4:400,400i,500,700|source-sans-3:400,500,600|jetbrains-mono:400,500|noto-serif-sc:500,700,900&display=swap" rel="stylesheet">

<!-- LXGW WenKai via cdn.jsdelivr -->
<link href="https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-light/font.css" rel="stylesheet">
```

**Production:** subset LXGW WenKai to actual Chinese characters used in articles (~300KB instead of ~3MB). Use a Hugo build hook that scans `content/**/*.md` and feeds character set to `fonttools subset`.

### Scale (px / rem)

| Step | Value | Use |
|---|---|---|
| `--text-xs` | 11px | Small-caps metadata, tags |
| `--text-sm` | 13px | UI labels, footer |
| `--text-base` | 17px (CN) / 18px (EN) | Body text |
| `--text-md` | 21px | Article-list titles |
| `--text-lg` | 28px | H3 / type-specimen display |
| `--text-xl` | 36px | Article H1 |
| `--text-2xl` | 48px | Site title 唐昆的空间 |

### Line-height

- **CJK body:** `1.85`
- **Latin body:** `1.6`
- **Display (CN + EN):** `1.05–1.25`
- Mixed-language paragraphs use the CJK value.

### Letter-spacing

- Display CN: `-0.01em` (slight tighten)
- UI small-caps: `0.12em–0.18em`
- Code: default (none)

## Color

### Light mode (default)

```css
:root {
  --bg:           #F5EFE4;  /* raw paper, slightly green-warm */
  --surface:      #ECE4D3;  /* deeper paper — code blocks, quote backgrounds */
  --rule:         #D7CDB8;  /* hairline rules, separators */
  --text-primary: #1F1B16;  /* black-coffee, never pure #000 */
  --text-muted:   #6B6258;
  --accent:       #B8412C;  /* vermillion seal red — used ONCE per surface */
}
```

### Dark mode

```css
[data-theme="dark"] {
  --bg:           #1A1714;  /* warm near-black, brown-shifted, never pure #000 */
  --surface:      #221E19;
  --rule:         #3A3530;
  --text-primary: #E8DFCE;
  --text-muted:   #8A8378;
  --accent:       #D26B4A;  /* warmed vermillion for dark contrast */
}
```

### Accent usage rules

The vermillion is the only color besides paper, ink, and muted gray. It must be used rarely and intentionally. Allowed surfaces:

- The **seal** itself (header + article signoff)
- **Inline link underlines** (1px thin, accent color)
- **Code-block left rule** (2px solid)
- **Numbered-step rules** (top border on list items)
- **Drop cap** on first paragraph of essay-type articles (NOT tutorials)
- **Hover state** on nav and inline links

NOT allowed: vermillion buttons (no buttons exist), vermillion gradients, vermillion backgrounds, vermillion icons.

### Background texture

Subtle paper grain via two stacked radial-gradients:

```css
background-image:
  radial-gradient(rgba(120, 100, 80, 0.04) 1px, transparent 1px),
  radial-gradient(rgba(120, 100, 80, 0.025) 1px, transparent 1px);
background-size: 3px 3px, 7px 7px;
background-position: 0 0, 1px 2px;
```

In dark mode the grain stays the same (RGBA tints are subtle enough to disappear into both backgrounds).

## Spacing

- **Base unit:** 4px
- **Scale:** 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96
- **Density:** comfortable (not compact, not spacious)
- **Paragraph margin:** `1.1em` between body paragraphs
- **Section margin:** `2.5em` between H2 sections
- **Article max-width:** 38em (≈ 620–680px depending on font)
- **Page side padding (mobile):** 24px; (desktop): 32px
- **Article-list row padding:** 14px top + bottom

## Layout

### Approach

Composition-first, not component-first. The homepage is a **table of contents**, not a feed. No card grids. No thumbnails on archive entries.

### Homepage

- **Header (top):**
  - Top-left: bilingual title lockup (`唐昆的空间` 48px / `Quentin's Space` italic 22px) **with the vermillion seal** beside it
  - Top-right: 3-item text nav (`文章 系列 关于`) in small-caps, plus theme toggle
- **Below header:** thin horizontal rule
- **Recent articles:** date-prefixed list, single column, `max-width: 720px`. Format: `2026·04 [Article Title]`. Latest 1-2 entries get a 1-2 sentence excerpt.
- **No card grid. No featured-image thumbnails. No tag cloud at the top.**
- **Footer:** small-caps copyright + version, separated by `border-top: 1px solid var(--rule)`.

### Article page

- Single column, `max-width: 38em`, generous side margins
- **Article H1:** Source Han Serif SC 700, 36px
- **Subtitle (optional):** Source Serif 4 italic 19px, muted
- **Meta line above H1:** small-caps, 12px, muted (`教程 · Series: Proxmox VE · #2 of 7`)
- **Body:** LXGW WenKai (CN) / Source Serif 4 Text (EN), 17–18px, line-height 1.85
- **Drop cap (essays only, not tutorials):** first letter of first paragraph at 3.2em, vermillion, float-left
- **Inline links:** body color text + 1px vermillion underline, padding-bottom 1px
- **Code blocks:** JetBrains Mono 14px, paper-tinted surface (`#ECE4D3`), 2px vermillion left border, NO border-radius, NO outer border
- **Inline code:** JetBrains Mono 0.92em, same paper-tinted surface, 1px × 6px padding
- **Numbered steps (tutorials):** custom counter with vermillion top-rule above each step number, small-caps 12px label
- **Tags (footer of article):** small-caps comma-list, muted with vermillion on hover
- **Author seal (article end):** vermillion seal, slightly rotated, ~48px

### Archive page

Chronological by year. Year headings in Source Han Serif SC heavy. Article entries follow homepage list pattern.

### Series page (e.g., `/pve/`)

Series have **ordered** indices — `series_order` matters. Show as a numbered table of contents. Each entry: `01 · 文章标题` with optional excerpt.

### Responsive

- **Desktop (≥768px):** as designed above
- **Mobile (<768px):** single column, side padding reduces to 24px, title lockup shrinks (`唐昆的空间` 36px), nav collapses below title, article-list dates move above titles

## Motion

- **Duration:** color transitions only, 150ms ease
- **Trigger:** link hover (color), nav hover (color + border underline), theme-toggle (fade)
- **NOT used:** entrance animations, scroll-driven reveals, hover transforms on cards (no cards exist), parallax, any animation longer than 200ms

The motion budget is small on purpose. Stillness is the target reaction.

## Signature: The Vermillion Seal (印)

A small red square seal stamp containing characters in **seal script (篆书 zhuanshu)**. Sits beside the bilingual title lockup on the homepage and at the end of every article.

### Specifications

- **Size:** 56×56px in the header, 48×48px in article signoff, 28×28px in any compact context
- **Rotation:** ~3° off-axis (varies between header and signoff to feel hand-pressed, not mechanical)
- **Color:** `var(--accent)` (`#B8412C` light / `#D26B4A` dark)
- **Characters:** **日新** — the two characters at the heart of the blog's name and Confucian source phrase (*苟日新，日日新，又日新*). Functions as a 闲章 (leisure seal) / 别号印 (style-name seal) in the 文人 tradition.
- **Form:** filled red square, characters in cream (`#F5EFE4` reading-room equivalent regardless of mode), with subtle ink-bleed at the edges via SVG `feTurbulence` + `feDisplacementMap`

### Why 日新 (not the author's name)

In the Chinese 印章 tradition, writers had multiple seals: a 姓名印 (full-name seal), a 字号印 (style-name seal), and 闲章 / 别号印 (leisure / pen-name seals carrying a literary motto). For a personal blog, the **闲章 form** is the right move — it's the writer's *voice*, not their identity card. **日新** carries:

1. **Cultural depth** — readers familiar with 大学 instantly recognize the source.
2. **Thematic resonance** — *renewing daily* is exactly what a bilingual tech blog about evolving infrastructure does.
3. **Visual strength** — both characters are dense, balanced, and read clearly in 篆书.

### Production checklist (TODO before launch)

- [ ] Replace the placeholder Noto-Serif-SC-rendered glyphs with proper **篆书 (seal script)** glyphs of **日新**. Options:
  - Commission a calligrapher (~$50–150 for one seal — most authentic; a 闲章 with 日新 would be a small, traditional commission a 篆刻 artist will do happily)
  - Use an online 篆刻生成器 service (e.g., qrbtf.com 印章生成器) and trace to clean SVG
  - Hand-trace from a 篆书字典 entry for 日 and 新
- [ ] Add the SVG to `assets/img/seal.svg`
- [ ] Reference via Hugo partial / shortcode: `{{< seal >}}`
- [ ] Test rendering in both light and dark modes
- [ ] Verify SSR / static export — no runtime SVG generation

## Bilingual: Equal Care for Both Languages

The blog is **Chinese-default, English-secondary** in routing — `/` serves Chinese, `/en/` serves English. But the design system treats both languages as **first-class**, not "translated":

### Brand display

| Surface | Chinese rendering | English rendering | Combined |
|---|---|---|---|
| Site title (CN page) | `日新笔记` (large, Source Han Serif SC 900) | `Quentin` (italic subtitle, Source Serif 4) | bilingual lockup |
| Site title (EN page) | (omitted or small subtitle) | `Quentin` (large, Source Serif 4 700) | author-first lockup |
| OG / social meta | `日新笔记 · Quentin` | `Quentin · 日新笔记` | both names always present |
| `<title>` tag | `[文章标题] · 日新笔记` | `[Article Title] · Quentin` | language-of-page first |

### Language switcher

A `中 · EN` switcher sits in the top-right header alongside the theme toggle. Active language gets a vermillion underline and accent color — **not** a separate icon. Switcher is text-only, restraint signal. Keyboard accessible.

```
中 · EN
```

The switcher should preserve current path when possible (e.g., `/pve/article-1/` → `/en/pve/article-1/` if EN translation exists; otherwise fall back to `/en/` homepage with a small notice "未翻译 / not yet translated").

### Per-language considerations

### Mixed-language paragraphs

When a Chinese paragraph contains English technical terms, set `font-family` to the CN body stack — modern browsers fall back to Latin glyphs from the inheritance chain automatically. Don't set per-language fonts at the paragraph level.

```css
.body {
  font-family: var(--font-cn-body), var(--font-en-body), serif;
  /* LXGW WenKai for Chinese, Source Serif 4 for fallback Latin glyphs */
}
```

### Font subsetting

Hugo build pipeline should:
1. Scan all `content/**/*.md` for unique CJK characters
2. Generate a subset of LXGW WenKai (~300KB instead of ~3MB) using `fonttools` or `glyphhanger`
3. Self-host the subset at `static/fonts/lxgw-wenkai-subset.woff2`
4. Replace the cdn.jsdelivr link with a self-hosted reference

### Punctuation

- Use Chinese full-width punctuation in Chinese text: `，。、？！（）「」`
- Use English half-width punctuation in English text: `, . ? ! ( ) "`
- In mixed paragraphs, follow the language of the surrounding clause
- Smart quotes for English: `"..."` and `'...'` (curly), not straight quotes

### Article frontmatter (no change to existing pattern)

```yaml
---
title: "文章标题"
date: 2026-04-28
description: "描述"
slug: "url-slug"
series: ["Proxmox VE"]
series_order: 1
tags: ["PVE", "Linux"]
---
```

## Anti-slop List (do NOT use)

- Inter, Roboto, Helvetica, Arial, system-ui, -apple-system as primary font
- Pure white background (`#FFFFFF`)
- Pure black text (`#000000`)
- Purple/violet/blue gradients
- 3-column feature grid with icons in colored circles
- Centered hero with featured image and tag pills
- Gradient buttons
- Glassmorphism / frosted-glass cards
- Rounded corners on every element (border-radius > 0 anywhere except the seal SVG path)
- Drop shadows on cards
- Parallax scrolling
- Stock photo backgrounds
- "Built for X" / "Designed for Y" marketing copy patterns
- Hover transforms (`translate`, `scale`) on cards/links
- Loading skeleton animations
- "Ask AI" floating button

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-28 | Initial design system created via /design-consultation | Research grounded in 5 peer sites (Maggie Appleton, Robin Sloan, Julia Evans, Yihui, Stephano); Codex + Claude subagent outside voices ran in parallel; user-approved via HTML preview. Memorable thing chosen: "warm, personal — feels like a person not a publication." |
| 2026-04-28 | Brand: **日新笔记** (CN) / **Quentin** (EN) | User-stated. CN brand is the literary identity (from 大学 / 苟日新，日日新，又日新); EN brand is the author. Don't translate 日新笔记 — the gloss dilutes the source. |
| 2026-04-28 | Seal characters: **日新** | Replaces earlier placeholder 唐昆. Functions as a 闲章 carrying the blog's thesis rather than a 姓名印 carrying the author's identity. More resonant for a personal tech blog about continuous learning. |
| 2026-04-28 | Header language switcher: `中 · EN` text-only | Both languages first-class, not "primary + translated." Active language gets vermillion underline. |
| 2026-04-28 | Vermillion seal as signature visual move | Subagent contribution. Culturally specific to CJK-first content; impossible to replicate by accident; identifiable in 2 seconds. |
| 2026-04-28 | Serif body throughout (including tutorials) | Keeps reading rhythm literary even mid-tutorial. LXGW WenKai (CN) + Source Serif 4 (EN) pair with the same hand-cut warmth. |
| 2026-04-28 | Cream `#F5EFE4` over white | All three voices (Claude main, Codex, subagent) converged on warm-paper background as table stakes for warm-personal blogs. |
| 2026-04-28 | Date-prefixed text-list archive (no card grid) | Stephano-style. Readers scan it instantly. Removes thumbnail dependency. |

## Implementation Path

The next step is **Hugo theme work**. The Blowfish theme is a solid base — but we'll need a custom `layouts/` override directory to apply this design system. Suggested order:

1. **Tokens first:** create `assets/css/tokens.css` with the CSS variables above
2. **Override partials:** `layouts/partials/` for `header.html`, `article.html`, `list.html`, `single.html`
3. **Custom shortcodes:** `{{< seal >}}` for the vermillion stamp
4. **Font pipeline:** Hugo asset pipeline + `glyphhanger` for subsetting
5. **Build artifacts:** test light/dark, mobile/desktop, mixed CJK + EN paragraphs, code blocks, drop caps
6. **Run `/design-review`** on the live `hugo server` to find visual regressions vs. this DESIGN.md

The HTML preview at `~/.gstack/projects/Quentinbest-writing-blog/designs/quentins-space-20260428/preview.html` is the visual reference. Match it.

## Reference Files

- **Approved preview:** `~/.gstack/projects/Quentinbest-writing-blog/designs/quentins-space-20260428/preview.html`
- **Approved snapshot:** `~/.gstack/projects/Quentinbest-writing-blog/designs/quentins-space-20260428/approved.json`
- **Research notes:** `~/.gstack/projects/Quentinbest-writing-blog/research-20260428/research-notes.md`
- **Peer site screenshots:** `~/.gstack/projects/Quentinbest-writing-blog/research-20260428/0[1-5]-*.png`
