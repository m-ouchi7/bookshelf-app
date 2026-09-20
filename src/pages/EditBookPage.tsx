import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  readingStatusLabels,
  type Book,
  type CreateBookInput,
  type ReadingStatus,
} from "../types/book";

type EditBookPageProps = {
  getBookById: (id: string) => Book | undefined;
  updateBook: (id: string, input: Partial<CreateBookInput>) => void;
};

type EditFormState = {
  title: string;
  author: string;
  publisher: string;
  status: ReadingStatus;
  evaluation: string;
  finishedAt: string;
  note: string;
};

function toFormState(book: Book): EditFormState {
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
  const [formState, setFormState] = useState<EditFormState | null>(
    book ? toFormState(book) : null
  );

  if (!id || !book || !formState) {
    return (
      <main className="page-shell">
        <p className="empty-state">該当する本が見つかりません。</p>
        <Link className="secondary-button" to="/">
          ← 一覧へ戻る
        </Link>
      </main>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = formState.title.trim();
    const author = formState.author.trim();
    if (!title || !author) {
      return;
    }

    updateBook(id, {
      title,
      author,
      publisher: formState.publisher.trim() || undefined,
      status: formState.status,
      evaluation: formState.evaluation
        ? Number(formState.evaluation)
        : undefined,
      finishedAt: formState.finishedAt || undefined,
      note: formState.note.trim() || undefined,
    });
    navigate(`/books/${id}`);
  };

  return (
    <main className="page-shell">
      <div className="page-actions">
        <Link className="secondary-button" to={`/books/${id}`}>
          ← 詳細へ戻る
        </Link>
      </div>
      <form className="edit-book-form" onSubmit={handleSubmit}>
        <h1>本を編集</h1>
        <div className="edit-book-form__fields">
          <div className="edit-book-form__field">
            <label htmlFor="edit-title">タイトル</label>
            <input
              id="edit-title"
              type="text"
              value={formState.title}
              required
              onChange={(event) =>
                setFormState({ ...formState, title: event.target.value })
              }
            />
          </div>
          <div className="edit-book-form__field">
            <label htmlFor="edit-author">著者</label>
            <input
              id="edit-author"
              type="text"
              value={formState.author}
              required
              onChange={(event) =>
                setFormState({ ...formState, author: event.target.value })
              }
            />
          </div>
          <div className="edit-book-form__field">
            <label htmlFor="edit-publisher">出版社</label>
            <input
              id="edit-publisher"
              type="text"
              value={formState.publisher}
              onChange={(event) =>
                setFormState({ ...formState, publisher: event.target.value })
              }
            />
          </div>
          <div className="edit-book-form__field">
            <label htmlFor="edit-status">読書ステータス</label>
            <select
              id="edit-status"
              value={formState.status}
              required
              onChange={(event) =>
                setFormState({
                  ...formState,
                  status: event.target.value as ReadingStatus,
                })
              }
            >
              {Object.entries(readingStatusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="edit-book-form__field">
            <label htmlFor="edit-evaluation">評価</label>
            <select
              id="edit-evaluation"
              value={formState.evaluation}
              onChange={(event) =>
                setFormState({ ...formState, evaluation: event.target.value })
              }
            >
              <option value="">未評価</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="edit-book-form__field">
            <label htmlFor="edit-finished-at">読了日</label>
            <input
              id="edit-finished-at"
              type="date"
              value={formState.finishedAt}
              onChange={(event) =>
                setFormState({ ...formState, finishedAt: event.target.value })
              }
            />
          </div>
          <div className="edit-book-form__field edit-book-form__field--wide">
            <label htmlFor="edit-note">メモ</label>
            <textarea
              id="edit-note"
              rows={4}
              value={formState.note}
              onChange={(event) =>
                setFormState({ ...formState, note: event.target.value })
              }
            />
          </div>
        </div>
        <div className="page-actions">
          <Link className="secondary-button" to={`/books/${id}`}>
            キャンセル
          </Link>
          <button className="primary-button" type="submit">
            保存する
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditBookPage;
