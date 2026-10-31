# 见山斋

基于 [Hugo](https://gohugo.io/) 与 [Stack 主题](https://github.com/CaiJimmy/hugo-theme-stack) 的个人博客。

## 本地预览

双击 `预览.bat`，浏览器会自动打开 http://localhost:1313 （需已安装 Hugo extended）。

## 博客助手（给不熟悉 git 的作者）

`blog-app/blog_app.py` 是一个独立的桌面小应用（双击 `blog-app/dist/博客助手.exe` 即可运行，无需安装 Python）：

1. 首次使用：菜单「设置 → 选择博客文件夹」，选到博客根目录（有 `hugo.toml` 的那层）
2. 新建文章 → 填标题/分类/标签 → 写正文 → 「插入图片」选照片（自动转格式、压缩、生成图注代码）
3. 「保存草稿」暂存不发布；「🌐 发布到 GitHub」一键提交推送，推上去后 Actions 自动构建上线
4. 第一次发布会弹出 GitHub 登录窗口，登录一次即可

源码改动后重新打包：`cd blog-app && python -m PyInstaller --onefile --windowed --name 博客助手 blog_app.py`

## 写作

- 文章放在 `content/posts/`，每篇一个 Markdown 文件（或同名文件夹 + `index.md` + 图片）
- 归档 / 搜索 / 关于三个页面在 `content/page/` 下，地址已在各自 front matter 里指定
- 字体与配色等视觉定制集中在 `assets/scss/custom.scss`，点击动效在 `assets/ts/custom.ts`

## 部署

1. 推送到 GitHub 后，在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**
2. `.github/workflows/deploy.yml` 会在每次 push 时自动构建发布
3. 主题以 git submodule 引用，clone 后需 `git submodule update --init`（Actions 已自动处理）

## 版权与许可

本站对「内容」和「代码」分别授权，这是静态站点博客的通行做法：

| 部分 | 许可 | 说明 |
| --- | --- | --- |
| 正文内容（`content/` 下的文章与图片） | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh) | 版权归作者本人；转载需署名、非商业、相同方式共享 |
| 站点定制代码（`assets/`、`layouts/` 等） | GPL-3.0 | 基于主题修改/扩展，随主题同协议发布 |
| [Stack 主题](https://github.com/CaiJimmy/hugo-theme-stack) | [GPL-3.0-only](https://github.com/CaiJimmy/hugo-theme-stack/blob/master/LICENSE) | 以 git submodule 引用，保留上游 LICENSE 与页脚署名 |

> GPL 只约束**代码**的传播，不会"传染"到你写的文章和图片上——内容是你的原创作品，版权完全属于你，采用 CC 协议即可，无需与 GPL 兼容。
