import type { Book, BookRow, CreateBookInput } from "../types/book";

export function toBook(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    publisher: row.publisher ?? undefined,
    status: row.status,
    evaluation: row.evaluation ?? undefined,
    note: row.note ?? undefined,
    finishedAt: row.finished_at ?? undefined,
    createdAt: row.created_at ?? new Date().toISOString(),
    updatedAt: row.updated_at ?? row.created_at ?? new Date().toISOString(),
  };
}

export function toInsertPayload(input: CreateBookInput) {
  return {
    title: input.title,
    author: input.author,
    publisher: input.publisher ?? null,
    status: input.status,
    evaluation: input.evaluation ?? null,
    note: input.note ?? null,
    finished_at: input.finishedAt ?? null,
    created_at: new Date().toISOString(),
  };
}

export function toUpdatePayload(input: Partial<CreateBookInput>) {
  const payload: Record<string, unknown> = {};

  if ("title" in input) payload.title = input.title;
  if ("author" in input) payload.author = input.author;
  if ("publisher" in input) payload.publisher = input.publisher ?? null;
  if ("status" in input) payload.status = input.status;
  if ("evaluation" in input) payload.evaluation = input.evaluation ?? null;
  if ("note" in input) payload.note = input.note ?? null;
  if ("finishedAt" in input) payload.finished_at = input.finishedAt ?? null;

  return payload;
}
