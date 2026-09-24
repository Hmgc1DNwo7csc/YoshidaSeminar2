# 研究室公式サイト（Eleventy製・静的サイト）

CG（コンピュータグラフィックス）／VR（仮想現実）／AIを研究する大学研究室の公式サイトです。
[Eleventy (11ty)](https://www.11ty.dev/) を用いた静的サイトとして構築しており、CMS・管理画面・サーバーサイドの仕組みは一切使用していません。

> **注意**: サイト内の大学名・研究室名（`【大学名】` `【研究室名】`）、メンバー名、研究内容、業績、住所などはすべてダミーです。公開前に `_data/site.json` `_data/members.json` `_data/research.json` `_data/achievements.json` および `content/posts/` 配下の記事を実際の内容に差し替えてください。

## ディレクトリ構成

```
content/posts/    ブログ（活動記録）記事のMarkdownファイル。1記事＝1ファイル
_data/            サイト全体の共通データ（サイト名、メンバー、研究テーマ、業績など）
_includes/        レイアウト（layouts/）とパーツ（partials/）のNunjucksテンプレート
assets/           CSS・JS・画像（そのまま出力先にコピーされます）
*.njk             各ページ（トップ／研究内容／メンバー／活動記録一覧／業績／アクセス）
eleventy.config.js  Eleventyの設定ファイル
_site/            ビルド後の出力先（git管理対象外）
```

## ローカルでの動作確認

Node.js 18以降が必要です。

```bash
npm install
npm run serve   # ローカルサーバーを起動し、http://localhost:8080 で確認できます
npm run build   # _site/ に静的ファイルを出力します
```

## ブログ記事（活動記録）の追加方法

管理画面や投稿フォームはありません。**`content/posts/` に新しいMarkdownファイルを1つ追加するだけ**で、一覧ページ（`/blog/`）とトップページの「最新の活動記事」に自動的に反映されます。

1. `content/posts/` に新しい `.md` ファイルを作成します（ファイル名は半角英数字推奨。例: `lab-trip-2026.md`）。
2. 冒頭に以下の形式でFrontmatter（メタ情報）を記述します。

   ```markdown
   ---
   title: "記事のタイトル"
   date: 2026-08-01
   thumbnail: /assets/images/posts/thumb-01.svg
   excerpt: "一覧ページに表示される抜粋文（1〜2文程度）"
   ---

   ここから本文をMarkdownで記述します。
   ```

3. ファイルを保存してビルド（`npm run build` またはGitHubへのpush）すれば反映されます。
   - `thumbnail` には既存の `assets/images/posts/` 内のSVGを流用するか、新しい画像を `assets/images/posts/` に追加して指定してください。
   - 記事の並び順は `date` の降順（新しい日付が先頭）です。同じ `layout` ・`permalink` 設定は `content/posts/posts.json` で全記事に自動適用されるため、記事ファイル側で指定する必要はありません。

## GitHub・Cloudflare Pagesでの公開手順

1. GitHubに新規リポジトリを作成し、このプロジェクト一式をpushします。
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <あなたのリポジトリURL>
   git push -u origin main
   ```
2. [Cloudflare Pages](https://pages.cloudflare.com/) のダッシュボードで「Create a project」→ 対象のGitHubリポジトリを選択します。
3. ビルド設定を以下のように指定します。
   - **Build command**: `npx @11ty/eleventy`
   - **Build output directory**: `_site`
4. デプロイ後は、`*.pages.dev` のURLで公開されます。大学の独自ドメインを接続する場合は、Cloudflare Pagesの「カスタムドメイン」設定から行えます。
5. 以降は `content/posts/` に記事のMarkdownファイルを追加してGitHubにpushするだけで、Cloudflare Pagesが自動的にビルド・再公開します。
