# 1ヶ月目 実装レビュー

## 1. 概要

1ヶ月目に実装した読書管理アプリについて、型設計・State設計・Component設計・Custom Hook・AI活用の観点から振り返る。

## 2. 総評

1ヶ月目に学習した設計知識を、実際のアプリ実装に適用できている。

特に、型・State・Componentの責務をそれぞれ分けて考え、実装前に設計を整理した上でAIを活用する流れを作れている。

一方で、APIやServer Stateを扱う設計については、今後さらに学習する必要がある。

## 3. 型設計

### 3.1 Union Typeによる値の制約

`ReadingStatus` にUnion Typeを使用し、取り得る値を型で制約している。

```ts
type ReadingStatus = "unread" | "reading" | "completed";
```

文字列を自由に扱うのではなく、ドメイン上取り得る値を型として表現できている。

### 3.2 Recordによる対応関係の保証

`ReadingStatus` と表示ラベルの対応に `Record` を使用している。

```ts
const readingStatusLabels: Record<ReadingStatus, string> = {
  unread: "未読",
  reading: "読書中",
  completed: "読了",
};
```

Statusを追加した場合にラベル側の対応漏れをTypeScriptで検知できる。

### 3.3 BookとCreateBookInputの分離

保存済みのデータを表す `Book` と、新規作成時に必要なデータを表す `CreateBookInput` を分離している。

```ts
type CreateBookInput = Omit<Book, "id" | "createdAt" | "updatedAt">;
```

「保存後に存在するデータ」と「作成時に必要なデータ」を別の型として扱えている。

### 3.4 Formの入力値とドメインデータの分離

Formでは入力値を文字列として扱い、ドメインデータでは数値として扱うなど、入力途中のデータとアプリ内で扱うデータを分けている。

Form入力をそのままドメインデータとして扱わず、必要に応じて検証・変換する設計につながる。

## 4. State設計

### 4.1 派生データをStateとして持っていない

`filteredBooks` を独立したStateとして持たず、`books`・`searchQuery`・`filterStatus` から計算している。

```ts
const filteredBooks = books.filter(...);
```

派生データをStateとして二重管理しないことで、State間の同期処理や不整合を避けている。

### 4.2 State Ownershipとの関係

`useBooks` にBook関連のStateと操作を集約し、Component側では必要なデータや操作を受け取って利用する構成にしている。

Stateをどこで管理するかを意識して設計できている。

## 5. Componentの責務

Componentごとに役割を分けている。

* `BookCard`

  * Bookの表示
  * 削除や読書ステータス変更などのUI操作
* `BookFilter`

  * 検索条件の入力
  * 読書ステータスのフィルタリング
* 各ページComponent

  * ページ全体の構成
  * 必要なデータや操作の受け渡し

単純にファイルを分割するのではなく、責務を基準にComponentを分割している。

## 6. Custom Hook

`useBooks` にBook関連のStateと操作ロジックを集約している。

* `books`
* `filterStatus`
* `searchQuery`
* `filteredBooks`
* `addBook`
* `getBookById`
* `updateBook`
* `updateBookStatus`
* `deleteBook`

これにより、Component側ではUIに関する処理に集中できる構成になっている。

## 7. AI活用

AIに実装を任せるだけではなく、役割を分けて利用している。

* 人間

  * 設計の検討
  * 最終判断
  * 最終レビュー・テスト
* Gemini

  * 要件整理
  * 型・State設計の検討
  * ドキュメント作成
  * レビュー
* GitHub Copilot

  * 設計をもとにしたコード生成・実装

実装前に、

```text
この画面にはどんなComponentが必要か
↓
各Componentの責務
↓
Stateを誰が持つか
↓
Propsで何を渡すか
↓
API通信をどこに置くか
```

という順番で設計を整理してからAIに実装させる流れを作った。

## 8. 改善ポイント

### 8.1 useBooksの責務が大きくなる可能性

現状では問題ないが、今後API通信・検索・ページネーション・バリデーション・エラー処理などが追加されると、`useBooks` の責務が大きくなる可能性がある。

今後は、どの処理をHookに置き、どこから分離するかを考える必要がある。

### 8.2 State setterを直接Propsとして渡している

現在は以下のようにState setterを直接渡している。

```tsx
<BookFilter
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  filterStatus={filterStatus}
  setFilterStatus={setFilterStatus}
/>
```

例えば、

```tsx
<BookFilter
  searchQuery={searchQuery}
  onSearchChange={handleSearchChange}
  filterStatus={filterStatus}
  onFilterChange={handleFilterChange}
/>
```

のように、Componentが「何をしたいのか」を表すPropsにする方法もある。

現状で必ず変更する必要はないが、Component間の責務をより明確にする方法として検討できる。

### 8.3 `as`による型アサーション

```ts
event.target.value as BookFilterStatus
```

のような型アサーションは、実際の値が `BookFilterStatus` であることを検証しているわけではない。

今後、Type GuardやZodなどを使った「値を検証してから型を付ける」設計につなげられる。

### 8.4 evaluationの型をさらに厳密にできる

現在の `evaluation?: number` は、コメント上では1〜5を想定している。

例えば、

```ts
type Evaluation = 1 | 2 | 3 | 4 | 5;
```

とすることで、型レベルでも取り得る値を制約できる。

ただし、型で制約することによるメリットと実装コストを考慮して判断する必要がある。

## 9. Stateの種類

今回のアプリを通して、Stateを以下のように整理できる。

| 種類           | 今回の例               |
| ------------ | ------------------ |
| Local State  | モーダルの開閉など          |
| Global State | ログインユーザーなど         |
| Server State | APIから取得するBookデータなど |
| URL State    | 検索条件・ページ番号など       |
| Form State   | Formの入力値           |

今回のアプリでは、Bookデータは `useState` で管理しているため、まだServer Stateとしては扱っていない。

今後API通信を導入した際に、Server Stateをどのように管理するかが次の課題になる。

## 10. 今後の学習課題

### Server State

* [ ] APIからのデータ取得
* [ ] Loading状態の設計
* [ ] Error状態の設計
* [ ] Success状態の設計
* [ ] キャッシュ
* [ ] 再取得
* [ ] データ更新後の同期

### 非同期処理

* [ ] Promise
* [ ] async / await
* [ ] API通信
* [ ] Request / Response
* [ ] HTTP Error
* [ ] Abort / cancellation

### エラー設計

* [ ] Formの入力エラー
* [ ] APIエラー
* [ ] 認証エラー
* [ ] 通信エラー
* [ ] 予期しないRuntime Error

### データ取得層

* [ ] API通信処理の分離
* [ ] Repository / Serviceの役割
* [ ] Custom Hookとの責務分担
* [ ] Server State管理

### より深い型設計

* [ ] API Responseの型設計
* [ ] Runtime Validation
* [ ] Parse, Don't Validate
* [ ] ドメインモデルとAPIモデルの分離

## 11. 1ヶ月目の成果

1ヶ月目を通して、以下の設計を実際のアプリに適用した。

* 型設計

  * Union Type
  * Utility Types
  * Form用の型
  * ドメインデータと入力データの分離
* State設計

  * State Ownership
  * 派生データをStateとして持たない設計
  * Local / Form / URL Stateの整理
* Component設計

  * Componentごとの責務分離
  * Propsによるデータ受け渡し
* Custom Hook

  * StateとBook操作ロジックの分離
* AI活用

  * 人間が設計・最終判断を担当
  * AIを設計検討・実装・レビューの補助として利用

1ヶ月目の目標である、

> 「なぜこの型・State・Component構成にしたのか」を自分の言葉で説明できるようになる

という点について、実際のコードをレビューしながら説明できる状態まで進めることができた。

今後はAPI・Server Stateを導入したときに、

* データはどこに存在するのか
* 誰がそのデータを管理するのか
* どこで変換・検証するのか
* どこでエラーを扱うのか

まで設計できることを目標とする。
