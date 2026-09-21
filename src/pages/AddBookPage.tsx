import { Link, useNavigate } from "react-router-dom";
import AddBookForm from "../components/AddBookForm";
import type { CreateBookInput } from "../types/book";

type AddBookPageProps = {
  addBook: (input: CreateBookInput) => Promise<void>;
};

function AddBookPage({ addBook }: AddBookPageProps) {
  const navigate = useNavigate();

  const handleAddBook = async (input: CreateBookInput) => {
    await addBook(input);
    navigate("/");
  };

  return (
    <main className="page-shell">
      <div className="page-actions">
        <Link className="secondary-button" to="/">
          ← 一覧へ戻る
        </Link>
      </div>
      <header className="page-header">
        <p className="eyebrow">NEW BOOK</p>
        <h1>本を追加</h1>
        <p>本の情報を入力して、本棚に登録します。</p>
      </header>
      <AddBookForm onAddBook={handleAddBook} />
    </main>
  );
}

export default AddBookPage;
