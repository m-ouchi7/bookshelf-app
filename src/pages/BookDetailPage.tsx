import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddBookForm from "../components/AddBookForm";
import { formatDate, formatDateTime } from "../utils/dateFormat";
import {
  bookFieldLabels,
  readingStatusLabels,
  type Book,
  type BookFormState,
  type CreateBookInput,
} from "../types/book";

type BookDetailPageProps = {
  getBookById: (id: string) => Book | undefined;
  updateBook: (id: string, input: Partial<CreateBookInput>) => void;
  deleteBook: (id: string) => void;
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

function BookDetailPage({
  getBookById,
  updateBook,
  deleteBook,
}: BookDetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = id ? getBookById(id) : undefined;
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("本当に削除しますか？")) {
      deleteBook(id);
      navigate("/");
    }
  };

  return (
    <main className="page-shell">
      <div className="page-actions">
        <Link className="secondary-button" to="/">
          ← 一覧へ戻る
        </Link>
        <div className="page-actions__group">
          {isEditing ? (
            <button
              className="secondary-button"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              キャンセル
            </button>
          ) : (
            <>
              <button
                className="primary-button"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                編集
              </button>
              <button
                className="delete-button"
                type="button"
                onClick={handleDelete}
              >
                削除
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <AddBookForm
          initialValue={toFormState(book)}
          onAddBook={handleUpdateBook}
          submitLabel="保存"
        />
      ) : (
        <article className="add-book-form-container book-detail">
          <p className="book-card__status">
            {readingStatusLabels[book.status]}
          </p>
          <h1>{book.title}</h1>
          <dl className="book-detail__details">
            <div>
              <dt>{bookFieldLabels.author}</dt>
              <dd>{book.author}</dd>
            </div>
            <div>
              <dt>{bookFieldLabels.publisher}</dt>
              <dd>{book.publisher ?? "未登録"}</dd>
            </div>
            <div>
              <dt>{bookFieldLabels.status}</dt>
              <dd>{readingStatusLabels[book.status]}</dd>
            </div>
            <div>
              <dt>{bookFieldLabels.evaluation}</dt>
              <dd>
                {book.evaluation
                  ? `${"★".repeat(book.evaluation)}${"☆".repeat(
                      5 - book.evaluation
                    )}`
                  : "未評価"}
              </dd>
            </div>
            <div>
              <dt>{bookFieldLabels.finishedAt}</dt>
              <dd>{formatDate(book.finishedAt)}</dd>
            </div>
            <div>
              <dt>{bookFieldLabels.note}</dt>
              <dd className="book-detail__note">{book.note ?? "未登録"}</dd>
            </div>
            <div>
              <dt>登録日時</dt>
              <dd>{formatDateTime(book.createdAt)}</dd>
            </div>
            <div>
              <dt>更新日時</dt>
              <dd>{formatDateTime(book.updatedAt)}</dd>
            </div>
          </dl>
        </article>
      )}
    </main>
  );
}

export default BookDetailPage;
