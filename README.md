# Quentin's Space

[中文](#中文) | [English](#english)

---

## 中文

一个基于 [Hugo](https://gohugo.io/) 构建、使用 [Blowfish](https://blowfish.page/) 主题的个人博客。

### 功能特性

- 多语言支持（简体中文 / English）
- 深色/浅色主题自动切换
- 全文搜索
- 系列文章（Series）分组
- 标签分类
- 响应式布局

### 本地开发

**前置要求：**

- [Hugo](https://gohugo.io/installation/) Extended 版本 (>= 0.141.0)
- Git

**克隆项目（含主题子模块）：**

```bash
git clone --recurse-submodules https://github.com/Quentinbest/writing-blog.git
cd writing-blog
```

**启动本地开发服务器：**

```bash
hugo server
```

浏览器访问 `http://localhost:1313` 即可预览。

**构建静态站点：**

```bash
hugo --gc --minify
```

### 创建新文章

```bash
hugo new content/pve/文章目录名/index.md
```

文章采用页面包（Page Bundle）结构，每篇文章是一个目录，包含 `index.md` 和可选的 `featured.png` 封面图。

Frontmatter 示例：

```yaml
---
title: "文章标题"
date: 2024-01-01
draft: false
description: "文章描述"
slug: "url-slug"
series: ["Proxmox VE"]
series_order: 1
tags: ["PVE", "Linux"]
---
```

### 多语言内容

- 默认语言为简体中文，`index.md` 即为中文内容
- 英文内容使用 `index.en.md` 文件名
- 分节索引页同理：`_index.md`（中文）、`_index.en.md`（英文）

### 项目结构

```
├── config/_default/        # 站点配置
│   ├── hugo.toml           # Hugo 核心配置
│   ├── params.toml         # Blowfish 主题参数
│   ├── languages.zh-cn.toml  # 中文语言配置
│   ├── languages.en.toml     # 英文语言配置
│   ├── menus.zh-cn.toml      # 中文导航菜单
│   ├── menus.en.toml         # 英文导航菜单
│   ├── markup.toml         # Markdown 渲染配置
│   └── module.toml         # Hugo 模块配置
├── content/                # 文章内容
│   ├── _index.md           # 首页（中文）
│   ├── _index.en.md        # 首页（英文）
│   └── pve/                # Proxmox VE 系列
├── assets/img/             # 站点图片资源
├── themes/blowfish/        # Blowfish 主题（Git 子模块）
└── .github/workflows/      # GitHub Actions 自动部署
```

### 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

### 许可证

内容版权归作者所有。主题 [Blowfish](https://github.com/nunocoracao/blowfish) 使用 MIT 许可证。

---

## English

A personal blog built with [Hugo](https://gohugo.io/) and the [Blowfish](https://blowfish.page/) theme.

### Features

- Multi-language support (Simplified Chinese / English)
- Dark/light theme with auto-switching
- Full-text search
- Article series grouping
- Tag taxonomy
- Responsive layout

### Local Development

**Prerequisites:**

- [Hugo](https://gohugo.io/installation/) Extended edition (>= 0.141.0)
- Git

**Clone the project (with theme submodule):**

```bash
git clone --recurse-submodules https://github.com/Quentinbest/writing-blog.git
cd writing-blog
```

**Start local dev server:**

```bash
hugo server
```

Visit `http://localhost:1313` to preview.

**Build static site:**

```bash
hugo --gc --minify
```

### Creating New Articles

```bash
hugo new content/pve/article-directory/index.md
```

Articles use page bundles — each article is a directory containing `index.md` and an optional `featured.png` cover image.

Frontmatter example:

```yaml
---
title: "Article Title"
date: 2024-01-01
draft: false
description: "Article description"
slug: "url-slug"
series: ["Proxmox VE"]
series_order: 1
tags: ["PVE", "Linux"]
---
```

### Multi-language Content

- Default language is Simplified Chinese; `index.md` is Chinese content
- English content uses `index.en.md` filename
- Section index pages follow the same pattern: `_index.md` (Chinese), `_index.en.md` (English)

### Project Structure

```
├── config/_default/        # Site configuration
│   ├── hugo.toml           # Hugo core config
│   ├── params.toml         # Blowfish theme parameters
│   ├── languages.zh-cn.toml  # Chinese language config
│   ├── languages.en.toml     # English language config
│   ├── menus.zh-cn.toml      # Chinese nav menu
│   ├── menus.en.toml         # English nav menu
│   ├── markup.toml         # Markdown rendering config
│   └── module.toml         # Hugo module config
├── content/                # Article content
│   ├── _index.md           # Homepage (Chinese)
│   ├── _index.en.md        # Homepage (English)
│   └── pve/                # Proxmox VE series
├── assets/img/             # Site image assets
├── themes/blowfish/        # Blowfish theme (Git submodule)
└── .github/workflows/      # GitHub Actions auto-deploy
```

### Deployment

Pushing to the `main` branch triggers GitHub Actions to build and deploy to GitHub Pages automatically.

### License

Content is copyrighted by the author. The [Blowfish](https://github.com/nunocoracao/blowfish) theme is licensed under MIT.
