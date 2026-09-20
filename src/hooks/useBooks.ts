import { useState } from "react";
import { initialBooks } from "../mocks/books";
import type { Book, CreateBookInput, ReadingStatus } from "../types/book";

export type BookFilterStatus = ReadingStatus | "all";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [filterStatus, setFilterStatus] = useState<BookFilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const addBook = (input: CreateBookInput) => {
    const now = new Date().toISOString();
    const book: Book = {
      ...input,
      id: `book-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: now,
      updatedAt: now,
    };

    setBooks((currentBooks) => [...currentBooks, book]);
  };

  const getBookById = (id: string) => books.find((book) => book.id === id);

  const updateBook = (id: string, input: Partial<CreateBookInput>) => {
    const updatedAt = new Date().toISOString();
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === id ? { ...book, ...input, updatedAt } : book
      )
    );
  };

  const updateBookStatus = (id: string, status: ReadingStatus) => {
    const updatedAt = new Date().toISOString();
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === id ? { ...book, status, updatedAt } : book
      )
    );
  };

  const deleteBook = (id: string) => {
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
