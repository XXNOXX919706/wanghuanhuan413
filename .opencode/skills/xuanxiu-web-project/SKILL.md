---
name: xuanxiu-web-project
description: Use whenever working on the 选秀网页 (talent show webpage) course project — a static HTML/CSS site. Covers page structure, assets, and how to preview it.
---

# 选秀网页项目 (Talent Show Webpage)

This is the **24002120413 王欢欢** course project: a static talent-show webpage built with plain HTML + CSS. No build tools or frameworks. Everything runs directly in a browser.

## Project layout

```
24002120413 王欢欢/
├── .opencode/skills/xuanxiu-web-project/   (this skill)
├── 选秀-网页/
│   ├── index.html            <-- main page, landing entry point
│   ├── 9.2.html / 9.4.html / 9.9.html  <-- class-work / practice pages
│   ├── 实验.html             (empty placeholder)
│   ├── css/
│   │   └── svg.css           <-- shared stylesheet
│   ├── font/                 <-- iconfont assets (Alibaba iconfont)
│   │   ├── iconfont.css / iconfont.js / iconfont.json
│   │   ├── iconfont.ttf / iconfont.woff / iconfont.woff2
│   │   └── demo.css / demo_index.html
│   ├── xxnoxx/               <-- repo-name mirror of the submission
│   │   ├── index.html
│   │   ├── 9.2.html / 9.4.html / 9.9.html
│   │   ├── README.md / README.en.md
│   │   └── .gitignore
│   └── 上课代码/             <-- in-class code copy of the same pages
```

## How to preview

No server needed — open any `.html` file directly:

- Main page: `选秀-网页/index.html`
- Practice pages: `选秀-网页/9.4.html`, `9.9.html`, `9.2.html`

## Editing conventions

- Keep the site static: inline the reference to `css/svg.css` and `font/iconfont.css` exactly as the existing pages do.
- Iconfont glyphs come from `font/iconfont.js/css`; import the same way as `index.html` does.
- When a new `9.x.html` practice page is added, mirror the structure of the most recent one and keep the same header/style links.
- Do not alter `xxnoxx/` and `上课代码/` unless explicitly asked — they are pinned copies of the submission and class code respectively.
- The page content is in Chinese; keep all copy in Chinese.

## Submission notes

- Person: 24002120413 王欢欢
- Remote repo: https://gitee.com/neusoft_wangyao_jsj/xxnoxx.git
- Never commit or print the Gitee private token.