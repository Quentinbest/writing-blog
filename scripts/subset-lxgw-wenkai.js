#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourceFont = path.join(root, "node_modules/@fontpkg/lxgw-wen-kai/LXGWWenKai-Regular.ttf");
const outputDir = path.join(root, "static/fonts");
const outputFont = path.join(outputDir, "lxgw-wenkai-subset.woff2");
const textFile = path.join(tmpdir(), "writing-blog-lxgw-wenkai-subset.txt");

const sourceDirs = [
  "content",
  "config/_default",
  "i18n",
  "layouts",
  "assets/css",
  "assets/js",
];
const extensions = new Set([".css", ".html", ".js", ".md", ".toml", ".yaml", ".yml"]);
const requiredGlyphs =
  "日新笔记苟日日新又中ENQuentin搜索最近文章系列关于返回顶部未翻译没有找到相关文章可以试试回到目录暂时不可用";

function collectFiles(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectFiles(fullPath);
    if (!extensions.has(path.extname(entry.name))) return [];
    return [fullPath];
  });
}

if (!existsSync(sourceFont)) {
  console.error("Missing LXGW WenKai source font. Run `npm install` first.");
  process.exit(1);
}

const text = sourceDirs
  .flatMap((dir) => collectFiles(path.join(root, dir)))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

const glyphText = Array.from(new Set(`${requiredGlyphs}\n${text}`)).join("");
mkdirSync(outputDir, { recursive: true });
writeFileSync(textFile, glyphText);

const result = spawnSync(
  "pyftsubset",
  [
    sourceFont,
    `--text-file=${textFile}`,
    `--output-file=${outputFont}`,
    "--flavor=woff2",
    "--with-zopfli",
    "--layout-features=*",
    "--recommended-glyphs",
    "--notdef-glyph",
    "--notdef-outline",
    "--name-IDs=*",
    "--name-legacy",
    "--name-languages=*",
  ],
  { stdio: "inherit" },
);

if (result.error && result.error.code === "ENOENT") {
  console.error("Missing `pyftsubset`. Install fonttools first, for example: `python3 -m pip install fonttools brotli`.");
  process.exit(1);
}

if (result.status !== 0) {
  process.exit(result.status || 1);
}

console.log(`Wrote ${path.relative(root, outputFont)} with ${glyphText.length} unique glyphs.`);
