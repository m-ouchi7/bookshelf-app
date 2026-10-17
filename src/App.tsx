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
  | "books"
  | "filteredBooks"
  | "filterStatus"
  | "setFilterStatus"
  | "searchQuery"
  | "setSearchQuery"
  | "isLoading"
  | "isError"
  | "error"
  | "retry"
>;

function HomePage({
  books,
  filteredBooks,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  isLoading,
  isError,
  error,
  retry,
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
        {isLoading ? (
          <p className="empty-state" role="status">
            本を読み込んでいます...
          </p>
        ) : isError ? (
          <div className="empty-state query-error" role="alert">
            <p>本の一覧を読み込めませんでした。</p>
            {error instanceof Error && <p>{error.message}</p>}
            <button
              className="secondary-button"
              type="button"
              onClick={() => void retry()}
            >
              再試行
            </button>
          </div>
        ) : books.length === 0 ? (
          <div className="empty-state">
            <p>本が登録されていません。</p>
            <Link className="primary-button" to="/books/new">
              本を追加
            </Link>
          </div>
        ) : filteredBooks.length > 0 ? (
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
    books,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    addBook,
    deleteBook,
    getBookById,
    updateBook,
    isLoading,
    isError,
    error,
    retry,
    notification,
    clearNotification,
  } = useBooks();

  return (
    <BrowserRouter>
      {notification && (
        <div
          className={`app-notification app-notification--${notification.kind}`}
          role={notification.kind === "error" ? "alert" : "status"}
        >
          <span>{notification.message}</span>
          <button
            type="button"
            aria-label="通知を閉じる"
            onClick={clearNotification}
          >
            ×
          </button>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              books={books}
              filteredBooks={filteredBooks}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoading={isLoading}
              isError={isError}
              error={error}
              retry={retry}
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
