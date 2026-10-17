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

  if (input.title !== undefined) payload.title = input.title;
  if (input.author !== undefined) payload.author = input.author;
  if (input.publisher !== undefined) payload.publisher = input.publisher;
  if (input.status !== undefined) payload.status = input.status;
  if (input.evaluation !== undefined) payload.evaluation = input.evaluation;
  if (input.note !== undefined) payload.note = input.note;
  if (input.finishedAt !== undefined) payload.finished_at = input.finishedAt;

  return payload;
}
