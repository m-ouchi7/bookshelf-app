# Supabase 構築・運用メモ

本アプリケーションにおけるSupabaseのテーブル設計、セキュリティ、および自動更新の仕組みに関する備忘録です。

## 1. `books` テーブルのスキーマと制約
- **テーブル名**: `books`
- **主なカラム**:
  - `id`: UUID (Primary Key)
  - `title`: TEXT (NOT NULL)
  - `author`: TEXT (NOT NULL)
  - `publisher`: TEXT (NULL可)
  - `status`: TEXT (NOT NULL)
  - `evaluation`: INTEGER (NULL可)
  - `note`: TEXT (NULL可)
  - `finished_at`: DATE (NULL可)
  - `created_at`: TIMESTAMP WITH TIME ZONE (NOT NULL, デフォルト: `now()`)
  - `updated_at`: TIMESTAMP WITH TIME ZONE (NULL可、デフォルト: `now()`)

## 2. セキュリティ設定 (RLS)
- 開発・テスト段階においては、スムーズな非同期CRUD操作の検証を行うため、`books` テーブルの **Row Level Security (RLS) を無効化** しています。
  - ※ 本番運用に移行する際は、適切なRLSポリシー（認証済みユーザーのみアクセス可能にする等）を再設定する必要があります。

## 3. 更新日時の自動更新（トリガー設定）
データの更新（UPDATE）時に `updated_at` カラムが自動的に現在時刻に書き換わるよう、PostgreSQLの関数とトリガーを導入しています。

### 導入したSQL
```sql
-- 更新日時を現在時刻に更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN   NEW.updated_at = timezone('utc'::text, now());   RETURN NEW; END; $$ language 'plpgsql';

-- booksテーブルのUPDATE時に実行されるトリガー
CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON books
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
