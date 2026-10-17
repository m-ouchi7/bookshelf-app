import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { Book, CreateBookInput, ReadingStatus } from "../types/book";
import {
  bookRowSchema,
  createBookInputSchema,
  updateBookInputSchema,
} from "../types/book";
import { toBook, toInsertPayload, toUpdatePayload } from "../utils/bookMapper";
import { formatErrorMessage } from "../utils/errorHandler";

export type BookFilterStatus = ReadingStatus | "all";
export type BookNotification = { kind: "success" | "error"; message: string };

const booksQueryKey = ["books"] as const;

export function useBooks() {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<BookFilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<BookNotification | null>(
    null,
  );

  const booksQuery = useQuery({
    queryKey: booksQueryKey,
    queryFn: async (): Promise<Book[]> => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const parsedRows = bookRowSchema.array().safeParse(data ?? []);
      if (!parsedRows.success) {
        throw parsedRows.error;
      }

      return parsedRows.data.map(toBook);
    },
  });

  const setMutationError = (message: string, error: unknown) => {
    console.error(message, error);
    setNotification({
      kind: "error",
      message: formatErrorMessage(message, error),
    });
  };

  const addBookMutation = useMutation({
    mutationFn: async (input: CreateBookInput): Promise<Book> => {
      const parsedInput = createBookInputSchema.safeParse(input);
      if (!parsedInput.success) throw parsedInput.error;

      const { data, error } = await supabase
        .from("books")
        .insert(toInsertPayload(parsedInput.data))
        .select()
        .single();

      if (error) throw error;

      const parsedRow = bookRowSchema.safeParse(data);
      if (!parsedRow.success) throw parsedRow.error;
      return toBook(parsedRow.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: booksQueryKey });
      setNotification({ kind: "success", message: "本を追加しました。" });
    },
    onError: (error) => setMutationError("本の追加に失敗しました。", error),
  });

  const updateBookMutation = useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: Partial<CreateBookInput>;
    }): Promise<Book> => {
      const parsedInput = updateBookInputSchema.safeParse(input);
      if (!parsedInput.success) throw parsedInput.error;

      const { data, error } = await supabase
        .from("books")
        .update(toUpdatePayload(parsedInput.data))
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      const parsedRow = bookRowSchema.safeParse(data);
      if (!parsedRow.success) throw parsedRow.error;
      return toBook(parsedRow.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: booksQueryKey });
      setNotification({ kind: "success", message: "本の情報を更新しました。" });
    },
    onError: (error) => setMutationError("本の更新に失敗しました。", error),
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: booksQueryKey });
      setNotification({ kind: "success", message: "本を削除しました。" });
    },
    onError: (error) => setMutationError("本の削除に失敗しました。", error),
  });

  const runMutation = async (mutation: () => Promise<unknown>) => {
    setNotification(null);
    try {
      await mutation();
      return true;
    } catch {
      return false;
    }
  };

  const books = booksQuery.data ?? [];

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    const matchesStatus =
      filterStatus === "all" || book.status === filterStatus;
    const matchesQuery =
      normalizedQuery === "" ||
      book.title.toLowerCase().includes(normalizedQuery) ||
      book.author.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });

  const addBook = (input: CreateBookInput) =>
    runMutation(() => addBookMutation.mutateAsync(input));

  const getBookById = (id: string) => books.find((book) => book.id === id);

  const updateBook = (id: string, input: Partial<CreateBookInput>) =>
    runMutation(() => updateBookMutation.mutateAsync({ id, input }));

  const updateBookStatus = async (
    id: string,
    status: ReadingStatus,
  ): Promise<boolean> => {
    return updateBook(id, { status });
  };

  const deleteBook = (id: string) =>
    runMutation(() => deleteBookMutation.mutateAsync(id));

  return {
    books,
    filteredBooks,
    isLoading: booksQuery.isLoading,
    isError: booksQuery.isError,
    error: booksQuery.error,
    retry: booksQuery.refetch,
    notification,
    clearNotification: () => setNotification(null),
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    addBook,
    getBookById,
    updateBook,
    updateBookStatus,
    deleteBook,
  };
}
