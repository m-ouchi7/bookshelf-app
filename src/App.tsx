import AddBookForm from "./components/AddBookForm";
import BookCard from "./components/BookCard";
import BookFilter from "./components/BookFilter";
import BookDetailPage from "./pages/BookDetailPage";
import EditBookPage from "./pages/EditBookPage";
import { useBooks } from "./hooks/useBooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

type HomePageProps = Pick<
  ReturnType<typeof useBooks>,
  | "filteredBooks"
  | "filterStatus"
  | "setFilterStatus"
  | "searchQuery"
  | "setSearchQuery"
  | "addBook"
  | "updateBookStatus"
  | "deleteBook"
>;

function HomePage({
  filteredBooks,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  addBook,
  updateBookStatus,
  deleteBook,
}: HomePageProps) {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">MY BOOKSHELF</p>
        <h1>読書管理</h1>
        <p>読みたい本と読んだ本を、シンプルに管理できます。</p>
      </header>

      <AddBookForm onAddBook={addBook} />
      <BookFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <section className="book-list" aria-label="本の一覧">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onStatusChange={updateBookStatus}
              onDelete={deleteBook}
            />
          ))
        ) : (
          <p className="empty-state">対象の本が見つかりません。</p>
        )}
      </section>
    </main>
  );
}

function App() {
  const {
    filteredBooks,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    addBook,
    updateBookStatus,
    deleteBook,
    getBookById,
    updateBook,
  } = useBooks();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              filteredBooks={filteredBooks}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              addBook={addBook}
              updateBookStatus={updateBookStatus}
              deleteBook={deleteBook}
            />
          }
        />
        <Route
          path="/books/:id"
          element={<BookDetailPage getBookById={getBookById} />}
        />
        <Route
          path="/books/:id/edit"
          element={
            <EditBookPage getBookById={getBookById} updateBook={updateBook} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
