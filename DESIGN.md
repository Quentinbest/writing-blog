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

<!-- LXGW WenKai self-hosted subset -->
<style>
@font-face {
  font-family: "LXGW WenKai";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/lxgw-wenkai-subset.woff2") format("woff2");
}
</style>
```

**Production:** LXGW WenKai is subset to the Chinese characters used in content and UI strings via `npm run font:subset`, which wraps `pyftsubset` and writes `static/fonts/lxgw-wenkai-subset.woff2`.

### Scale (px / rem)

| Step | Value | Use |
|---|---|---|
| `--text-xs` | 11px | Small-caps metadata, tags |
| `--text-sm` | 13px | UI labels, footer |
| `--text-base` | 17px (CN) / 18px (EN) | Body text |
| `--text-md` | 21px | Article-list titles |
| `--text-lg` | 28px | H3 / type-specimen display |
| `--text-xl` | 36px | Article H1 |
| `--text-2xl` | 48px | Site title 日新笔记 |

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
  - Top-left: bilingual title lockup (`日新笔记` 48px / `Quentin` italic 22px) **with the vermillion seal** beside it
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
- **Mobile (<768px):** single column, side padding reduces to 24px, title lockup shrinks (`日新笔记` 36px), nav collapses below title, article-list dates move above titles

### Information Architecture

The site is an editorial table of contents. The hierarchy is reading-first, not product-marketing-first.

```text
GLOBAL
  Header: seal + language-aware title + text nav + 中 · EN + theme toggle
  Main: one primary reading task per page
  Footer: copyright/version + restrained utility links

HOME /
  1. Brand lockup: 日新笔记 / Quentin + seal
  2. Recent writing list: latest technical notes first
  3. Section paths: 文章, 系列, 关于 as quiet navigation, not feature cards

ARTICLE
  1. Meta line: type, series, order, date when useful
  2. H1 + optional subtitle
  3. Body reading column
  4. Series context, tags, article-end seal, previous/next

SERIES /pve/
  1. Series title and one-sentence scope
  2. Ordered table of contents by `series_order`
  3. Each entry: number, title, optional excerpt, translation state if relevant

ARCHIVE / POSTS LIST
  1. Year heading
  2. Date-prefixed title list
  3. Optional one-line summary only when it helps distinguish adjacent articles

SEARCH / TAGS
  1. Search or tag label
  2. Count/context line
  3. Date-prefixed results list
```

If only three things can be visible above the fold, they are: the brand/seal, the newest useful writing, and the route to deeper archives. Everything else is secondary.

### Search, Tags, and Taxonomy Pages

- **Search:** keep Blowfish search functionality only if the presentation is restyled into a paper-toned overlay or page. No glass panels, cards, large rounded search boxes, or purple/blue default accents.
- **Tags:** tags are secondary metadata. They appear as small-caps text links, comma-separated where possible. No tag-cloud block on the homepage.
- **Taxonomy lists:** use the archive/list pattern. Group by year only when it improves scanning; otherwise prioritize relevance and title clarity.
- **No results:** show a warm empty state, e.g. `没有找到相关文章。可以试试 “PVE” 或回到文章目录。` / `No matching notes yet. Try “PVE” or return to the archive.` Include one primary text link, not a button.

### Interaction State Coverage

| Surface | Loading | Empty | Error | Success | Partial |
|---|---|---|---|---|---|
| Home recent list | Render plain text as soon as available; no skeleton animation | `还没有公开文章。` plus link to About when it exists | Build should fail rather than ship a broken homepage | Date-prefixed list with latest 1-2 excerpts | If only one post exists, show it without filler sections |
| Article page | Fonts may swap, but layout width must stay stable | Not applicable for published article | Missing article uses Hugo 404 with same paper/typography system | Single reading column, article-end seal, previous/next when available | Missing featured image must not create blank hero space |
| Series page | Ordered list renders without animation | `这个系列还在整理中。` plus link to all posts | Missing `series_order` falls back to date order and is flagged in QA | Numbered table of contents in intended order | Articles without excerpts still show number + title cleanly |
| Archive/list page | Text list appears without placeholder cards | `暂无归档文章。` plus home link | Taxonomy/list errors use same 404 shell | Year-grouped or date-prefixed list | Sparse years collapse without empty year headings |
| Search | Input appears immediately; results update without shifting header | Warm no-results message with one suggested query and archive link | Search index failure shows `搜索暂时不可用。` and archive link | Results list follows archive pattern | If JS is disabled, show archive link instead of a broken input |
| Language switcher | Static text link always visible | If translation missing, route to language homepage with notice | Broken translation link falls back to language homepage | Preserves equivalent path when translation exists | Missing translation notice is muted text, not a modal |
| Theme toggle | 150ms fade only | Not applicable | If stored preference fails, default to light | Light mode is default; dark mode honors same tokens | System preference may override only when user has no saved choice |

Empty states must sound like a human maintained the site. Avoid generic `No items found`.

### User Journey and Emotional Arc

| Step | User does | User should feel | Plan support |
|---|---|---|---|
| 1 | Lands on the homepage | Stillness, recognition that this is a personal notebook | Warm paper, serif lockup, vermillion seal, no hero marketing copy |
| 2 | Scans recent posts | Oriented within seconds | Date-prefixed list, excerpts only where useful, no thumbnails competing for attention |
| 3 | Opens a technical article | Confidence and focus | Narrow measure, high line-height, code blocks with a consistent left rule |
| 4 | Moves through a series | Progress and sequence | `series_order`, numbered TOC, previous/next context |
| 5 | Switches language | Respected, not redirected randomly | `中 · EN` preserves path where possible and explains missing translations quietly |
| 6 | Returns months later | Familiarity | Same seal, same typography, same archive grammar across surfaces |

The 5-second goal is atmosphere. The 5-minute goal is effortless reading. The 5-year goal is that the site feels like a durable notebook rather than a theme skin.

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

- [x] Replace the placeholder Noto-Serif-SC-rendered glyphs with proper **篆书 (seal script)** glyphs of **日新**. Done 2026-04-29 using CC0/Public Domain Shuowen seal-script SVGs from Wikimedia Commons.
- [x] Add the SVG to `assets/img/seal.svg`
- [x] Reference via Hugo partial / shortcode: `{{< seal >}}`
- [x] Test rendering in both light and dark modes
- [x] Verify SSR / static export — no runtime SVG generation

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

The project-owned font subset process:
1. Run `npm run font:subset` after content or UI copy changes.
2. The script scans content, config, layouts, and local CSS/JS for visible glyphs.
3. It generates `static/fonts/lxgw-wenkai-subset.woff2` from `@fontpkg/lxgw-wen-kai` using `pyftsubset`.
4. `assets/css/custom.css` references the self-hosted subset with `font-display: swap`.

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

## Responsive and Accessibility

Responsive design here is not "stack the desktop page." Each viewport keeps the same editorial grammar while changing emphasis and spacing.

| Viewport | Header | Lists | Article body | Navigation |
|---|---|---|---|---|
| Mobile `<768px` | Seal 44px, title 36px, subtitle 18px; nav wraps below lockup | Dates sit above titles; row padding stays 14px; excerpts only for latest item | `max-width: none`, 24px side padding, body 17px, code blocks allow horizontal scroll | Text links remain visible; no hamburger unless menu exceeds two lines |
| Tablet `768-1023px` | Seal 52px, title 42px; nav remains top-right if it fits | `max-width: 680px`, date/title on one line when possible | `max-width: 38em`, side padding 32px | Language switcher and theme toggle stay in header |
| Desktop `≥1024px` | Seal 56px, title 48px; quiet top-right utility cluster | `max-width: 720px`, compact date-prefixed rows | `max-width: 38em`; no decorative sidebars | Header alignment stays stable across languages |

Accessibility requirements:

- Use semantic landmarks: one `<header>`, one `<main>`, one `<footer>`, and `<nav aria-label="Primary">`.
- Add a skip link that appears on focus and lands at `<main>`.
- Every focusable item must have a visible focus state using `var(--accent)` underline or outline. Do not rely on color alone.
- Minimum hit target is 44×44px for theme toggle, language switcher links, search controls, and mobile navigation links.
- Contrast target: body text ≥ 7:1, muted text ≥ 4.5:1, accent links ≥ 4.5:1 against both light and dark backgrounds.
- Theme toggle must expose an accessible name (`切换深色模式` / `Toggle dark mode`) and current state.
- Language switcher uses `aria-current="page"` on the active language link.
- Search input uses a real `<label>` or `aria-label`, announces result count changes, and does not trap focus.
- Respect `prefers-reduced-motion`; with reduced motion, transitions become instant.
- Code blocks keep copy buttons keyboard reachable, but the copy UI must stay visually quiet and cannot cover code text.

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

## AI Slop Risk Check

Classifier: **editorial content site**. This is not a marketing landing page and not an app workspace. Apply universal rules plus the editorial constraints in this file.

| Check | Verdict | Design decision |
|---|---|---|
| Brand unmistakable in first screen? | Yes | `日新笔记` + `Quentin` + vermillion seal must be the largest identity signal |
| One strong visual anchor present? | Yes | The seal is the only decorative anchor |
| Page understandable by scanning headlines only? | Yes, if list titles stay literal | Article titles must carry meaning without card summaries |
| Each section has one job? | Yes | Home = recent writing; series = ordered TOC; archive = chronology |
| Are cards necessary? | No | Cards are banned except for an unavoidable third-party search modal shell, which must be restyled |
| Does motion improve hierarchy or atmosphere? | Minimal | Only hover/theme fades; stillness is the intended atmosphere |
| Would it feel premium without shadows? | Yes | No shadows are needed |

Hard rejection criteria for implementation:

- Any Blowfish card grid remains visible on home, list, taxonomy, or series pages.
- Any background hero image appears on the homepage, article page, archive, taxonomy, or series pages.
- English pages use `Nautilus Notes` instead of `Quentin`.
- Default Blowfish blue/purple accent, rounded cards, or dark-first appearance is visible.
- Search opens as a generic rounded/glass overlay instead of a paper-toned reading surface.

## What Already Exists

Reuse these project structures instead of inventing new routing or content models:

- Hugo multilingual routing: `index.md` / `index.en.md`, `_index.md` / `_index.en.md`, and `languages.*.toml`.
- Page bundles under `content/`, including existing `featured.png` files. The new design ignores thumbnails in lists but can keep images available inside articles.
- Existing taxonomies: `tags`, `authors`, and `series`.
- Existing `series_order` frontmatter in the PVE series.
- Blowfish as a base theme, but only as a source of Hugo partial structure and existing behavior. Its visible presentation must be overridden.
- Current content sections: `content/pve/` for the Proxmox VE series and `content/posts/` for standalone writing.
- Existing reference preview and approved snapshot listed below.

## Blowfish Alignment Requirements

Current Blowfish defaults conflict with this system and must be changed during implementation:

| Current behavior / config | Required direction |
|---|---|
| `defaultAppearance = "dark"` | Use light as the designed default. Dark mode remains available through the same warm tokens. |
| `colorScheme = "blowfish"` | Replace with project tokens from `assets/css/custom.css`. |
| `homepage.layout = "background"` and `layoutBackgroundBlur = true` | Replace with a custom homepage layout: paper background, title lockup, recent text list. |
| `article.showHero = true` / `heroStyle = "big"` | Disable default hero treatment unless an individual article intentionally embeds an image in body content. |
| `list.showCards = true`, `cardView = true`, taxonomy `cardView = true` | Disable cards. Lists are date-prefixed text rows. |
| `defaultBackgroundImage = "/img/background.jpg"` | Remove from default page presentation. No stock/background image shell. |
| English title currently `Nautilus Notes` | Change English title to `Quentin`; combined metadata may use `Quentin · 日新笔记`. |
| Menus include `Tags` as first-level nav | Tags can remain accessible, but primary nav should prioritize writing, series, about. |

Implementation should prefer `layouts/` overrides and project CSS over editing the Blowfish submodule.

## NOT in scope

- Rebranding away from `日新笔记` / `Quentin`; the brand decision is settled.
- Replacing Hugo or Blowfish entirely; the plan is an override-based theme implementation.
- Adding newsletter, comments, analytics widgets, "Ask AI", or monetization surfaces.
- Designing a marketing landing page; the homepage is a table of contents.
- Reworking article content, translations, or editorial voice beyond display and state requirements.

## Closed Design Debt

These launch-blocking debts have been closed in the project-owned Phase 1 implementation:

| Debt | Why it mattered | Status |
|---|---|---|
| Proper 篆书 seal artwork | Placeholder glyphs would weaken the most memorable brand move | `assets/img/seal.svg` uses CC0/Public Domain Shuowen seal-script glyphs and passes light/dark review |
| LXGW WenKai subsetting | Full font payload is too heavy for repeat readers | Self-hosted subset is generated by `npm run font:subset` and replaces the jsDelivr dependency |
| Search overlay restyling | Default theme search could break the paper/notebook illusion | Search no-results/error/success states match the archive pattern |
| Missing translations notice | Silent fallback makes bilingual care feel accidental | Language switcher shows a muted notice when translation is unavailable |

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
| 2026-04-28 | Plan-design review tightened IA, states, responsive, a11y, and Blowfish alignment | Prevents implementation from inheriting theme defaults that conflict with the approved editorial system. |

## Implementation Path

The next step is **Hugo theme work**. The Blowfish theme is a solid base — but we'll need a custom `layouts/` override directory to apply this design system. Suggested order:

### Phase 1: core implementation

This is the accepted engineering scope for the first implementation pass. It should be complete for the user-visible site while keeping launch-only production polish explicit.

1. **Config cleanup:** align `params.toml`, `languages.en.toml`, and menus with the brand, light default, no cards, no background heroes.
2. **CSS override:** create `assets/css/custom.css` with the design tokens and load it through Blowfish's existing custom CSS hook.
3. **Hook-based override strategy:** use Blowfish extension points first. Prefer config + `assets/css/custom.css` + targeted local partials (`home/custom.html`, `header/basic.html`, `article-link/simple.html`, `search.html`). Only fork `_default/single.html`, `_default/list.html`, `_default/term.html`, or `_default/terms.html` if config/CSS/partials cannot express the required behavior.
4. **Header override:** override the relevant Blowfish header partial for seal + lockup + text nav + `中 · EN` + theme toggle.
5. **Home/list/article/search overrides:** override the smallest necessary set of local templates or partials so every collection uses text rows instead of cards and search uses the paper-toned shell.
6. **Reusable seal partial/shortcode:** add a reusable project-owned seal component. A typographic placeholder is acceptable in Phase 1, but it must be isolated behind the same interface the final SVG will use.
7. **Search state patch:** keep Blowfish/Fuse search, but add a small project-owned JavaScript override or replacement for no-results and `index.json` load failure states. The search panel must never be blank after a query.
8. **Interaction states:** implement the state table above, especially search, missing translations, empty series, and 404.
9. **Automated smoke tests:** add a small Playwright suite and CI hook for core routes, search states, language switching, no-card/no-hero assertions, and desktop/mobile screenshots.
10. **Manual verification:** test light/dark, mobile/tablet/desktop, mixed CJK + EN paragraphs, code blocks, drop caps, keyboard navigation, search states, missing translations, and `hugo --gc --minify`.
11. **Run `/design-review`** on the live `hugo server` to find visual regressions vs. this DESIGN.md.

### Phase 1 test plan

Use `hugo server` for local browser tests and `hugo --gc --minify` for the production build check. The Playwright smoke suite should cover:

```text
CODE PATH COVERAGE
==================
[+] Config cleanup
    ├── [TEST] `hugo --gc --minify` catches TOML/template failures
    └── [TEST] `/` and `/en/` expose the correct language titles

[+] Header + language switcher
    ├── [TEST] CN home shows 日新笔记 + Quentin + seal
    ├── [TEST] EN home shows Quentin and never Nautilus Notes
    └── [TEST] Mobile nav remains reachable and visible at 390px width

[+] Home/list/article templates
    ├── [TEST] Home renders date-prefixed text rows, not card grid markup
    ├── [TEST] `/pve/`, `/posts/`, `/tags/`, and a tag term page do not render card grids
    └── [TEST] Article pages do not render the default hero image shell

[+] Search state patch
    ├── [TEST] Query with matches renders result rows
    ├── [TEST] Query with no matches renders the warm no-results message
    └── [TEST] Simulated `index.json` load failure renders a visible error state

USER FLOW COVERAGE
==================
[+] Reader lands on homepage
    ├── [TEST] Desktop screenshot: editorial table-of-contents structure
    └── [TEST] Mobile screenshot: brand/nav/readability intact

[+] Reader searches
    ├── [TEST] `/` keyboard shortcut opens search
    ├── [TEST] Escape closes search and restores focus behavior
    └── [TEST] Arrow/Enter navigation works when results exist

[+] Reader switches language
    ├── [TEST] Existing translation path is preserved
    └── [TEST] Missing translation falls back with a muted notice
```

### Phase 1 performance checks

There is no backend runtime path, database, or server-side request fan-out. The performance risks are static payload size, font loading, CSS/JS bundle growth, and the client-side search index.

Required checks:

- Run `hugo --gc --minify` and verify the site builds without template warnings.
- Keep the Phase 1 CSS override small and project-owned. Do not duplicate large chunks of Blowfish compiled CSS.
- Keep the search patch small and avoid replacing Fuse unless the existing search becomes a measurable bottleneck.
- In Playwright, record rough desktop/mobile page weight and flag obvious regressions: missing fonts causing layout shift, search modal jank, or card/hero assets loading after they should have been removed.
- Re-run `npm run font:subset` after adding Chinese content or UI copy, then verify the generated font remains reasonably small.

Do not edit files inside `themes/blowfish/`. Treat the theme submodule as an upstream dependency.

### Post-Phase 1 launch debt

These are deliberately not in the first implementation pass:

1. **Optional social image polish:** only if the visual QA shows OG/social previews need a dedicated asset.

The HTML preview at `~/.gstack/projects/Quentinbest-writing-blog/designs/quentins-space-20260428/preview.html` is the visual reference. Match it.

## Reference Files

- **Approved preview:** `~/.gstack/projects/Quentinbest-writing-blog/designs/quentins-space-20260428/preview.html`
- **Approved snapshot:** `~/.gstack/projects/Quentinbest-writing-blog/designs/quentins-space-20260428/approved.json`
- **Research notes:** `~/.gstack/projects/Quentinbest-writing-blog/research-20260428/research-notes.md`
- **Peer site screenshots:** `~/.gstack/projects/Quentinbest-writing-blog/research-20260428/0[1-5]-*.png`

## DESIGN PLAN REVIEW — COMPLETION SUMMARY

```text
+====================================================================+
|         DESIGN PLAN REVIEW — COMPLETION SUMMARY                    |
+====================================================================+
| System Audit         | DESIGN.md exists; UI scope is editorial site |
| Step 0               | initial score 7/10; reviewed all dimensions   |
| Pass 1  (Info Arch)  | 6/10 -> 10/10 after hierarchy + flow specs    |
| Pass 2  (States)     | 3/10 -> 10/10 after interaction state table   |
| Pass 3  (Journey)    | 5/10 -> 10/10 after emotional arc storyboard  |
| Pass 4  (AI Slop)    | 8/10 -> 10/10 after hard rejection criteria   |
| Pass 5  (Design Sys) | 8/10 -> 10/10 after Blowfish alignment specs  |
| Pass 6  (Responsive) | 4/10 -> 10/10 after viewport + a11y specs     |
| Pass 7  (Decisions)  | 10 resolved, 0 unresolved                     |
+--------------------------------------------------------------------+
| NOT in scope         | written (6 items)                            |
| What already exists  | written                                     |
| TODOS.md updates     | 0 file updates; 4 launch debts in DESIGN.md  |
| Decisions made       | 10 added to plan                            |
| Decisions deferred   | 0 unresolved; 4 tracked launch debts         |
| Overall design score | 7/10 -> 10/10                               |
+====================================================================+
```

Plan is design-complete. Run `/design-review` after implementation for visual QA.

## ENGINEERING PLAN REVIEW — COMPLETION SUMMARY

```text
+====================================================================+
|         ENGINEERING PLAN REVIEW — COMPLETION SUMMARY               |
+====================================================================+
| Step 0: Scope Challenge | scope reduced to Phase 1 core             |
| Architecture Review     | 1 issue found, resolved                   |
| Code Quality Review     | 1 issue found, resolved                   |
| Test Review             | diagram produced, 1 gap set resolved      |
| Performance Review      | 0 blocking issues; checks added           |
| NOT in scope            | written in Phase 1 / launch debt sections |
| What already exists     | written                                   |
| TODOS.md updates        | 2 items added, 1 skipped                  |
| Failure modes           | 0 critical gaps flagged                   |
| Outside voice           | skipped; design review already clean      |
| Lake Score              | 3/3 recommendations chose complete option |
+====================================================================+
```

Unresolved decisions: none.

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | — |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | — | — |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | clean | 3 issues, 0 critical gaps |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | clean | score: 7/10 -> 10/10, 10 decisions |

**UNRESOLVED:** 0
**VERDICT:** DESIGN + ENG CLEARED — ready to implement Phase 1.
