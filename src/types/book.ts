import { z } from "zod";

export const readingStatusSchema = z.enum(["unread", "reading", "completed"]);

/**
 * 読書ステータス
 */
export type ReadingStatus = z.infer<typeof readingStatusSchema>;

export const readingStatusLabels: Record<ReadingStatus, string> = {
  unread: "未読",
  reading: "読中",
  completed: "読了",
};

export const bookFieldLabels = {
  title: "タイトル",
  author: "著者",
  publisher: "出版社",
  status: "ステータス",
  evaluation: "評価",
  finishedAt: "読了日",
  note: "メモ",
} as const;

export const bookSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  author: z.string(),
  publisher: z.string().optional(),
  status: readingStatusSchema,
  evaluation: z.number().int().min(1).max(5).optional(),
  note: z.string().optional(),
  finishedAt: z.string().optional(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

/**
 * 本のドメインモデル
 */
export type Book = z.infer<typeof bookSchema>;

export const bookRowSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  author: z.string(),
  publisher: z.string().nullable(),
  status: readingStatusSchema,
  evaluation: z.number().int().min(1).max(5).nullable(),
  note: z.string().nullable(),
  finished_at: z.string().nullable(),
  created_at: z.string().min(1),
  updated_at: z.string().min(1),
});

/**
 * Supabaseのbooksテーブルの行データ
 */
export type BookRow = z.infer<typeof bookRowSchema>;

export const createBookInputSchema = z.object({
  title: z.string().trim().min(1, "タイトルを入力してください。"),
  author: z.string().trim().min(1, "著者を入力してください。"),
  publisher: z.string().optional(),
  status: readingStatusSchema,
  evaluation: z
    .number()
    .int("評価は1〜5で選択してください。")
    .min(1, "評価は1〜5で選択してください。")
    .max(5, "評価は1〜5で選択してください。")
    .optional(),
  note: z.string().optional(),
  finishedAt: z.string().optional(),
});

/**
 * 新規登録用の入力データ型（id, createdAt, updatedAt は自動生成のため除外）
 */
export type CreateBookInput = z.infer<typeof createBookInputSchema>;

export const updateBookInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "タイトルを入力してください。")
    .optional(),
  author: z.string().trim().min(1, "著者を入力してください。").optional(),
  publisher: z.string().optional(),
  status: readingStatusSchema.optional(),
  evaluation: createBookInputSchema.shape.evaluation,
  note: z.string().optional(),
  finishedAt: z.string().optional(),
});
export type UpdateBookInput = z.infer<typeof updateBookInputSchema>;

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
