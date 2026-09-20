/**
 * 読書ステータス
 */
export type ReadingStatus = "unread" | "reading" | "completed";

export const readingStatusLabels: Record<ReadingStatus, string> = {
  unread: "未読",
  reading: "読中",
  completed: "読了",
};

/**
 * 本のドメインモデル
 */
export interface Book {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  status: ReadingStatus;
  evaluation?: number; // 1〜5の5段階評価
  note?: string;
  finishedAt?: string; // YYYY-MM-DD
  createdAt: string; // ISO形式の作成日時
  updatedAt: string; // ISO形式の更新日時
}

/**
 * 新規登録用の入力データ型（id, createdAt, updatedAt は自動生成のため除外）
 */
export type CreateBookInput = Omit<Book, "id" | "createdAt" | "updatedAt">;

/**
 * 本の追加・編集フォームで扱う入力値
 */
export type BookFormState = {
  title: string;
  author: string;
  publisher: string;
  status: ReadingStatus;
  evaluation: string;
  finishedAt: string;
  note: string;
};
