# 01. 初期アーキテクチャ・設計仕様書

## 1. データ型（Book）の設計
`src/types/book.ts` にて定義。

* `id`: string（一意の識別子）
* `title`: string（タイトル）
* `author`: string（著者）
* `publisher?`: string（出版社・任意）
* `status`: 'unread' | 'reading' | 'completed'（読書ステータス）
* `evaluation?`: number（1〜5の5段階評価・任意）
* `note?`: string（感想・メモ・任意）
* `finishedAt?`: string（読了日・任意）
* `createdAt`: string（作成日時）
* `updatedAt`: string（更新日時）

---

## 2. 状態（State）およびロジックの管理設計
データおよび主要ロジックは Custom Hook（`useBooks`）に集約し、コンポーネント側には必要な State と操作関数のみを渡す。

* **全体データ（Master State）**
  * Custom Hook（`useBooks`）内で管理する `books` 配列。
* **一覧（TOP）ページ用の状態**
  * 検索キーワード（`searchQuery`）およびフィルター条件（`filterStatus`）を State として管理。
  * 画面表示用の絞り込み一覧（`filteredBooks`）は State として保持せず、既存の `books`, `searchQuery`, `filterStatus` から派生（計算）して取得する。
* **詳細ページ用の状態**
  * コンポーネント内の Local State として表示モード / 編集モードの切り替え用 State を保持する。

---

## 3. コンポーネント構成設計

* **一覧（TOP）ページ**
  * 新規登録ボタン
  * 検索・フィルターエリア（検索窓 / ステータス切り替え）
  * 一覧表示エリア
    * BookCard（1冊ずつの表示用カードコンポーネント）
* **詳細ページ**
  * 各種入力フォーム（State 切り替えによる「表示モード」「編集モード」の制御）
