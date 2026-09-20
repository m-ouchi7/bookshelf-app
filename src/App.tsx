import BookCard from "./components/BookCard";
import BookFilter from "./components/BookFilter";
import { useBooks } from "./hooks/useBooks";
import "./App.css";

function App() {
  const {
    filteredBooks,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    updateBookStatus,
    deleteBook,
  } = useBooks();

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">MY BOOKSHELF</p>
        <h1>読書管理</h1>
        <p>読みたい本と読んだ本を、シンプルに管理できます。</p>
      </header>

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

export default App;
