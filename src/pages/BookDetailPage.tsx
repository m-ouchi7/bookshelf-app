import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import {
  readingStatusLabels,
  type Book,
  type BookFormState,
  type CreateBookInput,
} from "../types/book";

type BookDetailPageProps = {
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

function BookDetailPage({ getBookById, updateBook }: BookDetailPageProps) {
  const { id } = useParams();
  const book = id ? getBookById(id) : undefined;
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<BookFormState | null>(
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

  const updateField = <K extends keyof BookFormState>(
    field: K,
    value: BookFormState[K]
  ) => {
    setFormState((current) =>
      current ? { ...current, [field]: value } : current
    );
  };

  const startEditing = () => {
    setFormState(toFormState(book));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setFormState(toFormState(book));
    setIsEditing(false);
  };

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
    setIsEditing(false);
  };

  return (
    <main className="page-shell">
      <div className="page-actions">
        <Link className="secondary-button" to="/">
          ← 一覧へ戻る
        </Link>
        {isEditing ? (
          <div className="page-actions__group">
            <button
              className="secondary-button"
              type="button"
              onClick={cancelEditing}
            >
              キャンセル
            </button>
            <button
              className="primary-button"
              type="submit"
              form="book-detail-form"
            >
              保存
            </button>
          </div>
        ) : (
          <button
            className="primary-button"
            type="button"
            onClick={startEditing}
          >
            編集
          </button>
        )}
      </div>

      <form
        id="book-detail-form"
        className="book-detail"
        onSubmit={handleSubmit}
      >
        <p className="book-card__status">
          {readingStatusLabels[isEditing ? formState.status : book.status]}
        </p>
        <div className="book-detail__title-row">
          <h1>
            {isEditing ? (
              <input
                id="detail-title"
                aria-label="タイトル"
                type="text"
                value={formState.title}
                required
                onChange={(event) => updateField("title", event.target.value)}
              />
            ) : (
              book.title
            )}
          </h1>
        </div>
        <dl className="book-detail__details">
          <div>
            <dt>著者</dt>
            <dd>
              {isEditing ? (
                <input
                  id="detail-author"
                  aria-label="著者"
                  type="text"
                  value={formState.author}
                  required
                  onChange={(event) =>
                    updateField("author", event.target.value)
                  }
                />
              ) : (
                book.author
              )}
            </dd>
          </div>
          <div>
            <dt>出版社</dt>
            <dd>
              {isEditing ? (
                <input
                  id="detail-publisher"
                  aria-label="出版社"
                  type="text"
                  value={formState.publisher}
                  onChange={(event) =>
                    updateField("publisher", event.target.value)
                  }
                />
              ) : (
                book.publisher ?? "未登録"
              )}
            </dd>
          </div>
          <div>
            <dt>読書ステータス</dt>
            <dd>
              {isEditing ? (
                <select
                  id="detail-status"
                  aria-label="読書ステータス"
                  value={formState.status}
                  required
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as BookFormState["status"]
                    )
                  }
                >
                  {Object.entries(readingStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                readingStatusLabels[book.status]
              )}
            </dd>
          </div>
          <div>
            <dt>評価</dt>
            <dd>
              {isEditing ? (
                <StarRating
                  value={
                    formState.evaluation
                      ? Number(formState.evaluation)
                      : undefined
                  }
                  onChange={(value) =>
                    updateField("evaluation", value?.toString() ?? "")
                  }
                />
              ) : (
                <StarRating value={book.evaluation} />
              )}
            </dd>
          </div>
          <div>
            <dt>読了日</dt>
            <dd>
              {isEditing ? (
                <input
                  id="detail-finished-at"
                  aria-label="読了日"
                  type="date"
                  value={formState.finishedAt}
                  onChange={(event) =>
                    updateField("finishedAt", event.target.value)
                  }
                />
              ) : (
                book.finishedAt ?? "未登録"
              )}
            </dd>
          </div>
          <div>
            <dt>メモ</dt>
            <dd className="book-detail__note">
              {isEditing ? (
                <textarea
                  id="detail-note"
                  aria-label="メモ"
                  rows={6}
                  value={formState.note}
                  onChange={(event) => updateField("note", event.target.value)}
                />
              ) : (
                book.note ?? "未登録"
              )}
            </dd>
          </div>
          <div>
            <dt>登録日時</dt>
            <dd>{book.createdAt}</dd>
          </div>
          <div>
            <dt>更新日時</dt>
            <dd>{book.updatedAt}</dd>
          </div>
        </dl>
      </form>
    </main>
  );
}

export default BookDetailPage;
