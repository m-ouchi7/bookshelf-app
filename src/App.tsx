import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import BookCard from "./components/BookCard";
import BookFilter from "./components/BookFilter";
import { useBooks } from "./hooks/useBooks";
import BookDetailPage from "./pages/BookDetailPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import "./App.css";

type HomePageProps = Pick<
  ReturnType<typeof useBooks>,
  | "filteredBooks"
  | "filterStatus"
  | "setFilterStatus"
  | "searchQuery"
  | "setSearchQuery"
>;

function HomePage({
  filteredBooks,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
}: HomePageProps) {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">MY BOOKSHELF</p>
        <h1>読書管理</h1>
        <p>読みたい本と読んだ本を、シンプルに管理できます。</p>
      </header>

      <Link className="primary-button add-book-link" to="/books/new">
        + 本を追加
      </Link>
      <BookFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <section className="book-list" aria-label="本の一覧">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
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
            />
          }
        />
        <Route path="/books/new" element={<AddBookPage addBook={addBook} />} />
        <Route
          path="/books/:id"
          element={
            <BookDetailPage
              getBookById={getBookById}
              updateBook={updateBook}
              deleteBook={deleteBook}
            />
          }
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
