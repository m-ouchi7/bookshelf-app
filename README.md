# Bookshelf App (読書管理アプリケーション)

React と TypeScript を用いて構築した、個人向けの読書管理アプリケーションです。  
開発者が自ら設計と最終決定を行い、複数の AI ツール（Gemini / GitHub Copilot Chat）を役割に応じて活用しながら、設計思想やプロンプト履歴を記録する開発プロセスを採用しています。

---

## 🛠 技術スタック (Tech Stack)

* **フロントエンド**: React 19 / TypeScript
* **ビルドツール**: Vite
* **サーバーデータ管理**: TanStack Query
* **API / バリデーション**: Supabase / Zod
* **ランタイム環境**: Node.js 24系（開発環境: v24.21.0）
* **開発支援・設計パートナー (AI)**:
  * **Gemini**: 概念設計の壁打ち、課題整理、ドキュメント構成提案、コードレビュー・動作確認アドバイス
  * **GitHub Copilot Chat**: 設計仕様に基づくTypeScript/Reactコードの生成・実装指示の実行

---

## 🤖 AIの活用と役割分担

本プロジェクトでは、AIに全面的に依存するのではなく、以下のように明確な役割分担を行って開発を進めています。

```text
[ 開発者 (人間) ]
  ├── 設計のアイデア出し・最終決定
  └── AIが生成したコードの最終レビュー・動作確認
       │
       ├─── [ Gemini ]
       │      ・要件定義や型設計、State設計の検討パートナー
       │      ・開発ドキュメント（README/設計書/プロンプト集）の構成案作成
       │      ・生成コードの客観的なレビューとアドバイス
       │
       └─── [ GitHub Copilot Chat ]
              ・作成されたプロンプトに基づく具体的なソースコード生成
```
---

## 📐 設計思想とアーキテクチャ

保守性・再利用性・アクセシビリティを考慮した設計を行っています。

### 1. サーバーデータとUI状態の分離
* 書籍データはTanStack Queryのキャッシュを信頼できる情報源として管理し、`useBooks` (`src/hooks/useBooks.ts`) に取得・追加・更新・削除の処理を集約。
* CRUD成功時は`invalidateQueries`で書籍Queryを無効化し、最新データを再取得。
* 検索語とステータスフィルターはUIローカル状態として保持し、Queryから得た書籍に対して`filteredBooks`を計算。

### 2. APIとフォーム境界の検証
* Supabaseから取得した行は`bookRowSchema`で検証してから、`toBook`でDomainモデルの`Book`へ変換。
* フォーム値は`createBookInputSchema`で検証し、Mutation内でも新規・更新用スキーマで再検証。
* DB行（`BookRow`）、Domainモデル（`Book`）、フォーム状態（`BookFormState`）を分け、`src/utils/bookMapper.ts`でDB形式との変換を担当。

### 3. コンポーネント設計（単一責任の原則）
* **`BookCard`**: 1冊の読書情報をカードとして表示。タイトルから詳細画面へ移動でき、セマンティックなマークアップ (`<article>`, `<dl>`) を使用。
* **`BookFilter`**: キーワード検索とステータス絞り込みのコントロール。React state setterではなく、値を受け取る変更コールバックを利用。
* **`App`**: Query状態に応じた一覧表示、再試行導線、共通通知を構成。

---

## 🚀 セットアップ

### 必要な環境

* Node.js 24系
* npm
* Supabaseプロジェクトと`books`テーブル

### インストールと起動

```bash
npm ci
npm run dev
```

### Supabase環境変数

プロジェクトルートに`.env.local`を作成し、SupabaseのProject URLと公開用anon keyを設定します。

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

`service_role` keyなどの秘密鍵をフロントエンド用環境変数に設定しないでください。開発環境でRLSを無効にしている場合、本番環境では適切なRLSポリシーを有効にしてください。テーブルとRLSの開発メモは[Supabase setup](docs/design/supabase-setup.md)を参照してください。

### 主なコマンド

```bash
npm run dev      # 開発サーバー
npm run build    # TypeScript検査と本番ビルド
npm run lint     # ESLint
npm run preview  # 本番ビルドのプレビュー
```

---

## 📚 設計ドキュメント

* [初期アーキテクチャ設計](docs/design/01-initial-architecture-design.md)
* [API / Domain / Formデータフロー](docs/design/02-api-domain-form-data-flow.md)
* [エラーハンドリング設計](docs/design/03-error-handling-design.md)
* [Supabase構築・運用メモ](docs/design/supabase-setup.md)

---

## 📁 ディレクトリ構造 & 開発ドキュメント

開発プロセスや AI への指示プロンプト履歴はすべてドキュメントとして記録・管理しています。

```text
bookshelf-app/
├── docs/
│   ├── design/                 # 設計仕様書・アーキテクチャ定義
│   └── prompts/                # AIへの指示プロンプト履歴
├── src/
│   ├── components/             # フォーム、一覧、入力UI
│   ├── hooks/                  # Query / Mutationと書籍ロジック
│   ├── lib/                    # Supabaseクライアント
│   ├── pages/                  # 一覧、追加、詳細、編集ページ
│   ├── types/                  # Domain型とZodスキーマ
│   ├── utils/                  # DBマッピング、日付、エラー処理
│   ├── App.tsx
│   └── main.tsx
└── README.md
