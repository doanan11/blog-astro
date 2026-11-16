# 我的博客（Astro + GitHub Pages）

## 常用命令

| 操作 | 命令 |
| --- | --- |
| 本地预览 | `npm run dev` → 打开 http://localhost:4321/blog-astro/ |
| 新建文章 | `npm run new -- "文章标题" --tags 随笔,记录` |
| 本地构建 | `npm run build` |
| 发布 | `git add . && git commit -m "新文章" && git push` |

## 三条硬规则

1. **一篇文章 = 一个目录 + `index.md`**，目录名就是文章地址，建好后不要改。
2. **配图必须和 `index.md` 放在同一目录**，正文用 `![](./图片名.png)` 引用。
3. **`date` 必须是带引号的 `YYYY-MM-DD`**，写错日期构建会直接失败并指出文件。

## 草稿与发布

- 文章 frontmatter 里 `draft: true` → 本地可见，线上不出现。
- 全站只通过 `src/lib/posts.ts` 的 `getPublishedPosts()` 取文章，草稿不会漏出去。
- 推送到 `main` 分支，GitHub Actions 自动构建并部署。

## 目录说明

```
src/
├─ consts.ts            # 站点标题、简介、导航（改文案只改这里）
├─ content.config.ts    # 内容集合与校验（date 严格校验）
├─ content/posts/       # 文章：每篇一个目录 + index.md
├─ content/pages/       # 独立页面（关于页）
├─ layouts/             # BaseLayout / PostLayout
├─ components/          # Nav / PostList
├─ lib/                 # url.ts（withBase）、posts.ts（文章出口）
├─ pages/               # 首页、文章、标签、归档、关于、404、rss.xml
└─ styles/global.css    # 全站样式（含暗色模式）
```
