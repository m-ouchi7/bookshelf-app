# Prompt 07: Supabase CRUD連携の実装指示

## 実行日
2026-09-21

## 指示文（GitHub Copilot Chatへ投入）

このプロジェクトでは、設計と最終決定は私が行います。
あなたは「実装者」として以下の設計に従ってコードを作成してください。

【制約】
- 設計（型定義や関数の役割）を勝手に変更しないこと
- 新しい外部ライブラリを追加しないこと
- 実装前に不明点や懸念があれば質問すること

【指示内容】
1. MSW（Mock Service Worker）によるSupabaseAPIのモック設定:
   - SupabaseのREST APIエンドポイント（`*/rest/v1/books*`）に対する `GET`, `POST`, `PATCH`, `DELETE` リクエストをインターセプトし、ローカルのモックデータで応答するMSWハンドラーが正しく機能するように確認・調整してください。

2. `src/hooks/useBooks.ts` のSupabase非同期連携への書き換え:
   - モックデータ（`initialBooks`）を使った直接のローカルステート管理を廃止し、Supabaseクライアント（`supabase.from('books')`）を用いた非同期通信（`SELECT`, `INSERT`, `UPDATE`, `DELETE`）を行う実装へ書き換えてください。
   - 初回ロード時にSupabaseからデータを取得（`SELECT` と `order` による並び替え）するようにしてください。

3. データベース型とフロントエンド型のマッピング:
   - DB側のスネークケース（`created_at`, `updated_at` など）と、フロントエンドの型（camelCase: `createdAt`, `updatedAt` など）を正しく変換・マッピングするヘルパー関数を含めてください。

4. 各CRUD関数の非同期化:
   - `addBook`: 入力値を受け取り、Supabaseへ `INSERT` を実行し、成功したらステートを更新してください。
   - `updateBook`: 指定されたIDのレコードに対して `UPDATE` を実行し、更新内容を反映してください。
   - `deleteBook`: 指定されたIDのレコードに対して `DELETE` を実行し、フロントエンドのステートから除外してください。

5. エラーハンドリング:
   - 通信時にエラーが発生した場合は、コンソールへの出力やユーザーへの通知（`alert` など）を適切に行ってください。
