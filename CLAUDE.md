# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Local development server with live reload
hugo server

# Build site (output goes to ./public)
hugo

# Build for production (minified)
hugo --gc --minify

# Create a new article (Chinese, default language)
hugo new content/pve/article-name/index.md
```

## Architecture

This is a **Hugo static site** using the [Blowfish theme](https://blowfish.page/docs/) (located in `themes/blowfish/` as a git submodule). Deployment is automated via GitHub Actions (`.github/workflows/hugo.yaml`) on every push to `main`, publishing to GitHub Pages.

Requires Hugo Extended >= 0.141.0 (CI uses 0.159.1).

### Configuration

All site config lives in `config/_default/`:
- `hugo.toml` — core Hugo settings (taxonomies: tags, authors, series; default language: zh-cn)
- `params.toml` — Blowfish theme parameters (layout, appearance, article display options)
- `languages.zh-cn.toml` / `languages.en.toml` — per-language site title, author profile, date format
- `menus.zh-cn.toml` / `menus.en.toml` — per-language navigation menus

### Multi-language

- Default content language is `zh-cn` (Simplified Chinese)
- `index.md` / `_index.md` → Chinese content
- `index.en.md` / `_index.en.md` → English content
- Language-specific config and menus use the `.zh-cn.toml` / `.en.toml` suffix pattern

### Content Structure

Content is in `content/`. Articles use page bundles (folder with `index.md` + optional `featured.png`).
- `content/pve/` — Proxmox VE series about home server setup
- The `_index.md` in each section controls section metadata and cascade frontmatter

### Content Frontmatter

```yaml
---
title: "Article Title"
date: 2024-01-01
draft: false
description: "Brief description"
slug: "url-slug"
series: ["Proxmox VE"]
series_order: 1
tags: ["PVE", "Linux"]
---
```

The `pve` section cascades `showDate: false`, `showAuthor: false`, `invertPagination: true` to all child articles.

## Design System

Always read `DESIGN.md` before making any visual or UI decisions.

All font choices, colors, spacing, motion, layout patterns, and aesthetic direction are defined there.

**Brand:** 日新笔记 (CN) / Quentin (EN). Don't translate 日新笔记 to English — it's a literary name from 大学 (《大学》: 苟日新，日日新，又日新). Use *Quentin* in EN contexts, *日新笔记* in CN contexts, *日新笔记 · Quentin* when both must appear.

**Aesthetic:** "engineer's notebook, late evening" — warm cream paper, vermillion seal signature mark (characters: **日新**), Source Han Serif SC + LXGW WenKai for Chinese, Source Serif 4 for English, serif body throughout (including tutorials), header language switcher `中 · EN`.

- Do not deviate from `DESIGN.md` without explicit user approval.
- In QA / review mode, flag any code that doesn't match `DESIGN.md` tokens (colors, fonts, spacing).
- The visual reference preview lives at `~/.gstack/projects/Quentinbest-writing-blog/designs/quentins-space-20260428/preview.html`.
- The vermillion seal SVG (signature mark) needs proper 篆书 glyphs before launch — see `DESIGN.md` § "Production checklist".
