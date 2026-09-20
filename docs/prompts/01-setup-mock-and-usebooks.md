# Prompt 01: モックデータおよび useBooks Hook の実装指示

## 実行日
2026-09-20

## 指示文（GitHub Copilot Chatへ投入）

このプロジェクトでは、設計と最終決定は私が行います。
あなたは「実装者」として以下の設計に従ってコードを作成してください。

【制約】
- 設計（型定義や関数の役割）を勝手に変更しないこと
- 新しい外部ライブラリを追加しないこと
- 実装前に不明点や懸念があれば質問すること

【指示内容】
1. `src/mocks/books.ts` を作成し、`Book` 型に沿った初期表示用のダミーデータを3件程度用意してください。
2. `src/hooks/useBooks.ts` を作成してください。
   - 初期値として上記ダミーデータを使用します。
   - `books`（全件）, `filterStatus`, `searchQuery` を State として管理します。
   - 表示用の `filteredBooks` は `books`, `filterStatus`, `searchQuery` から派生させて計算してください（不要なStateを作らないこと）。
   - 本の追加（`addBook`）、ステータス更新（`updateBookStatus`）、削除（`deleteBook`）の関数を実装してください。
   - `addBook` では `id`（一意な文字列）、`createdAt`（現在日時）、`updatedAt`（現在日時）を自動付与してください。
