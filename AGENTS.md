# AGENTS.md

Static HTML/CSS/JS course project (24002120413 王欢欢). No package manager, build, lint, or test tooling — verify changes by opening pages in a browser.

## Layout / entry points

- `index.html` — landing page for the icon demos; links all four `iconfont-*.html` pages.
- `iconfont-1.html` / `iconfont-2.html` — Font Awesome (font icon) vs Lucide (inline SVG) showcase.
- `iconfont-3.html` / `iconfont-4.html` — mobile fixed bottom tab bars, font-icon vs SVG-symbol versions.
- `cdn/` — local Font Awesome + Lucide assets (offline). `font/` — Alibaba iconfont assets. Reference them with the same relative paths the existing pages use.
- `四级项目/` — separate "腾讯动漫" mobile mock site (max-width 375px) with `css/style.css`, `js/script.js`, `css/iconfont.css`. Page filenames contain spaces/dots (`5. read.html`) — quote paths in shell and URLs.
- `上课代码/` — in-class copies. `选秀-网页/` — tracked duplicate snapshot (no `index.html`), not the active site. Edit root-level files, not these, unless asked.
- `.trae-html-share-packages/` — exported zips; do not edit.

## Conventions

- Prefix all CSS class names, IDs, and JS variables with `whh_` (standing rule in `whh_prompt.md`). `四级项目/` already uses `wang_` — keep `wang_` there instead of renaming.
- Every new HTML page must be linked from the root `index.html`.
- UI copy is Chinese; keep new copy Chinese.
- `whh_prompt.md` is the prompt log: append a record (time, model, prompt) before executing a request; never overwrite older records.
- Keep the site framework-free and assets local (`cdn/`, `font/`); do not add external CDN URLs.

## Comment conventions

### HTML file header

Every **new** HTML file must start with a header comment right after `<!DOCTYPE html>` (or as the first line inside `<head>`), containing exactly these four fields:

```html
<!--
  作者：王欢欢
  建立时间：YYYY-MM-DD
  使用大模型：Trae
  功能名称：<页面功能简述>
-->
```

- Fill `建立时间` with the actual creation date.
- Fill `功能名称` with a short Chinese description of the page's purpose.
- Existing HTML files do not need retrofitting unless they are being edited.

### JavaScript function comments

Every function in `<script>` blocks or `.js` files must have a leading comment describing its main purpose. Use either JSDoc or a single-line comment placed immediately above the function declaration:

```javascript
// 功能：<该函数主要实现的功能>
function whh_xxx() { ... }

// 功能：<该函数主要实现的功能>
const whh_yyy = () => { ... };
```

- Keep the description concise and in Chinese.
- Arrow functions, function declarations, and methods all need this comment.
- Trivial one-line callbacks (e.g. `.forEach(x => x++)`) are exempt.


## Verification / gotchas

- Root iconfont pages work over `file://`. `四级项目/js/script.js` fetches `./data/{comic,category,rank,user}.json` and `./images/…`; those directories are absent, and `fetch` fails on `file://`. Serve over HTTP (e.g. `python -m http.server`) and expect data/image sections to 404 until those assets are added.
- Files are UTF-8 without BOM; preserve encoding when editing (do not resave as ANSI/GBK).
- There is no test or lint command; do not invent one.

## Git

- Branch `master`, remote `origin` on Gitee. The OAuth token is embedded in `.git/config` — never print, copy, or commit it.
- `xxnoxx/` and `上课代码/xxnoxx` are nested git repos recorded as gitlinks (mode `160000`), with no `.gitmodules` (not submodules). The outer repo will not capture changes inside them; commit there separately if needed. The nested `xxnoxx` has many untracked HTML files.
- Push flow: `.trae/skills/git-push-gitee/SKILL.md`. Project skill: `.opencode/skills/xuanxiu-web-project/SKILL.md` (predates the iconfont/`四级项目` pages; prefer this file where they conflict).
