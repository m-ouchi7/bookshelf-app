# Prompt 03: 新規登録フォームコンポーネント (AddBookForm) の実装指示

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
1. `src/components/AddBookForm.tsx` を作成してください。
   - `CreateBookInput` 型を受け取り、フォーム送信時に親へ渡す `onAddBook: (input: CreateBookInput) => void` プロップを定義してください。
   - 以下の入力要素を用意してください：
     - タイトル (`title`, 必須, text)
     - 著者 (`author`, 必須, text)
     - 出版社 (`publisher`, 任意, text)
     - 読書ステータス (`status`, 必須, select: `unread` / `reading` / `completed`, 初期値: `unread`)
     - 評価 (`evaluation`, 任意, selectまたはnumber input: 1〜5の5段階評価)
     - 読了日 (`finishedAt`, 任意, date input: YYYY-MM-DD)
     - メモ (`note`, 任意, textarea)
   - フォーム全体はデフォルトで非表示（または折りたたみ）とし、「+ 本を追加」ボタンをクリックすることで開閉（トグル）できるようにしてください。
   - `<form>` 要素を使用し、送信時に `preventDefault()` を実行してください。
   - 送信成功後、フォームの内部 State を初期値にリセットし、フォームを閉じます。
   - アクセシビリティに配慮し、各入力要素と `<label>` を適切に関連付けてください。

2. `src/App.tsx` に `AddBookForm` を組み込んでください。
   - `useBooks` から `addBook` 関数を取り出します。
   - `AddBookForm` に `addBook` を渡し、ヘッダーとフィルターエリアの間に配置してください。
