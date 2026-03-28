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
