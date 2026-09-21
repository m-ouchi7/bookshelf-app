import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type {
  Book,
  BookRow,
  CreateBookInput,
  ReadingStatus,
} from "../types/book";
import { toBook, toInsertPayload, toUpdatePayload } from "../utils/bookMapper";
import { reportError } from "../utils/errorHandler";

export type BookFilterStatus = ReadingStatus | "all";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filterStatus, setFilterStatus] = useState<BookFilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        reportError("本の取得に失敗しました。", error);
        return;
      }

      if (isMounted) {
        setBooks(((data ?? []) as BookRow[]).map(toBook));
      }
    };

    void loadBooks();

    return () => {
      isMounted = false;
    };
  }, []);

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

  const addBook = async (input: CreateBookInput) => {
    const { data, error } = await supabase
      .from("books")
      .insert(toInsertPayload(input))
      .select()
      .single();

    if (error) {
      reportError("本の追加に失敗しました。", error);
      return;
    }

    setBooks((currentBooks) => [toBook(data as BookRow), ...currentBooks]);
  };

  const getBookById = (id: string) => books.find((book) => book.id === id);

  const updateBook = async (id: string, input: Partial<CreateBookInput>) => {
    const { data, error } = await supabase
      .from("books")
      .update(toUpdatePayload(input))
      .eq("id", id)
      .select()
      .single();

    if (error) {
      reportError("本の更新に失敗しました。", error);
      return;
    }

    const updatedBook = toBook(data as BookRow);
    setBooks((currentBooks) =>
      currentBooks.map((book) => (book.id === id ? updatedBook : book))
    );
  };

  const updateBookStatus = async (id: string, status: ReadingStatus) => {
    await updateBook(id, { status });
  };

  const deleteBook = async (id: string) => {
    const { error } = await supabase.from("books").delete().eq("id", id);

    if (error) {
      reportError("本の削除に失敗しました。", error);
      return;
    }

    setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id));
  };

  return {
    books,
    filteredBooks,
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
