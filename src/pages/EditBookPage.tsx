import { Link, useNavigate, useParams } from "react-router-dom";
import AddBookForm from "../components/AddBookForm";
import type { Book, BookFormState, CreateBookInput } from "../types/book";

type EditBookPageProps = {
  getBookById: (id: string) => Book | undefined;
  updateBook: (id: string, input: Partial<CreateBookInput>) => void;
};

function toFormState(book: Book): BookFormState {
  return {
    title: book.title,
    author: book.author,
    publisher: book.publisher ?? "",
    status: book.status,
    evaluation: book.evaluation?.toString() ?? "",
    finishedAt: book.finishedAt ?? "",
    note: book.note ?? "",
  };
}

function EditBookPage({ getBookById, updateBook }: EditBookPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = id ? getBookById(id) : undefined;

  if (!id || !book) {
    return (
      <main className="page-shell">
        <p className="empty-state">該当する本が見つかりません。</p>
        <Link className="secondary-button" to="/">
          ← 一覧へ戻る
        </Link>
      </main>
    );
  }

  const handleUpdateBook = (input: CreateBookInput) => {
    updateBook(id, input);
    navigate(`/books/${id}`);
  };

  return (
    <main className="page-shell">
      <div className="page-actions">
        <Link className="secondary-button" to={`/books/${id}`}>
          ← 詳細へ戻る
        </Link>
      </div>
      <header className="page-header">
        <p className="eyebrow">EDIT BOOK</p>
        <h1>本を編集</h1>
        <p>本の情報を編集して、本棚を更新します。</p>
      </header>
      <AddBookForm
        initialValue={toFormState(book)}
        onAddBook={handleUpdateBook}
        submitLabel="保存する"
      />
      <div className="edit-form-actions">
        <Link className="secondary-button" to={`/books/${id}`}>
          キャンセル
        </Link>
      </div>
    </main>
  );
}

export default EditBookPage;
