# Prompt 04: React Router 導入、詳細画面 (BookDetailPage) および編集機能の実装指示

## 実行日
2026-09-20

## 指示文（GitHub Copilot Chatへ投入）

このプロジェクトでは、設計と最終決定は私が行います。
あなたは「実装者」として以下の設計に従ってコードを作成してください。

【制約】
- 設計（型定義や関数の役割）を勝手に変更しないこと
- 指定以外の新しい外部ライブラリを追加しないこと
- 実装前に不明点や懸念があれば質問すること

【指示内容】
1. ルーティングライブラリの導入:
   - `react-router-dom` を追加・設定してください。
   - ルート構成:
     - `/` : 一覧画面（`AddBookForm` による新規追加 + `BookFilter` + `BookCard` 一覧）
     - `/books/:id` : 詳細画面 (`BookDetailPage`)
     - `/books/:id/edit` : 編集画面 (`EditBookPage`)

2. `useBooks` Hook の拡張:
   - IDから1件の本を取得する `getBookById: (id: string) => Book | undefined` を追加してください。
   - 指定IDの本を更新する `updateBook: (id: string, input: Partial<CreateBookInput>) => void` を追加してください。

3. `BookCard.tsx` の改修:
   - カード全体（またはタイトル）をクリックした際、 `/books/${book.id}` へ遷移するように `react-router-dom` の `Link` を実装してください。

4. 詳細画面コンポーネント (`src/pages/BookDetailPage.tsx`) の作成:
   - URLパラメータから `id` を取得し、`getBookById` で該当する本のデータを取得してください。
   - 本が存在しない場合は「該当する本が見つかりません」と表示し、一覧に戻るボタンを配置してください。
   - 上部に操作エリアを用意し、「← 一覧へ戻る」ボタンと「編集」ボタン（`/books/:id/edit` へ遷移）を配置してください。
   - 以下の全情報をわかりやすく表示してください：
     - タイトル (`title`)
     - 著者 (`author`)
     - 出版社 (`publisher`)
     - 読書ステータス (`status`)
     - 評価 (`evaluation`)
     - 日付 (`finishedAt`)
     - メモ (`note`)
     - 登録日時 (`createdAt`)
     - 更新日時 (`updatedAt`)

5. 編集画面コンポーネント (`src/pages/EditBookPage.tsx`) の作成:
   - URLパラメータから `id` を取得し、対象の本のデータをフォームに初期値としてセットしてください。
   - 入力項目・バリデーション（タイトル・著者必須）は `AddBookForm` と同等にしてください。
   - 「保存する」ボタンで `updateBook` を呼び出し、保存成功後は詳細画面 (`/books/:id`) または TOP ページへリダイレクトしてください。
   - 「キャンセル」ボタンを押すと詳細画面に戻るようにしてください。

6. `src/App.tsx` の改修:
   - `BrowserRouter` を用いて、各ルートに対応するコンポーネントを描画するようにルーティングを設定してください。
