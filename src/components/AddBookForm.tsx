import { useState, type FormEvent } from "react";
import {
  readingStatusLabels,
  type CreateBookInput,
  type ReadingStatus,
} from "../types/book";

type AddBookFormProps = {
  onAddBook: (input: CreateBookInput) => void;
};

type FormState = {
  title: string;
  author: string;
  publisher: string;
  status: ReadingStatus;
  evaluation: string;
  finishedAt: string;
  note: string;
};

const initialFormState: FormState = {
  title: "",
  author: "",
  publisher: "",
  status: "unread",
  evaluation: "",
  finishedAt: "",
  note: "",
};

function AddBookForm({ onAddBook }: AddBookFormProps) {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = formState.title.trim();
    const author = formState.author.trim();
    if (!title || !author) {
      return;
    }

    onAddBook({
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
    setFormState(initialFormState);
    setIsOpen(false);
  };

  return (
    <section className="add-book-form-container" aria-label="本の追加">
      <button
        type="button"
        className="add-book-toggle"
        aria-expanded={isOpen}
        aria-controls="add-book-form"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? "− 閉じる" : "+ 本を追加"}
      </button>

      {isOpen && (
        <form
          id="add-book-form"
          className="add-book-form"
          onSubmit={handleSubmit}
        >
          <div className="add-book-form__fields">
            <div className="add-book-form__field">
              <label htmlFor="book-title">タイトル</label>
              <input
                id="book-title"
                name="title"
                type="text"
                value={formState.title}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="add-book-form__field">
              <label htmlFor="book-author">著者</label>
              <input
                id="book-author"
                name="author"
                type="text"
                value={formState.author}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    author: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="add-book-form__field">
              <label htmlFor="book-publisher">出版社</label>
              <input
                id="book-publisher"
                name="publisher"
                type="text"
                value={formState.publisher}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    publisher: event.target.value,
                  }))
                }
              />
            </div>
            <div className="add-book-form__field">
              <label htmlFor="book-status">ステータス</label>
              <select
                id="book-status"
                name="status"
                value={formState.status}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    status: event.target.value as ReadingStatus,
                  }))
                }
                required
              >
                {Object.entries(readingStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="add-book-form__field">
              <label htmlFor="book-evaluation">評価</label>
              <select
                id="book-evaluation"
                name="evaluation"
                value={formState.evaluation}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    evaluation: event.target.value,
                  }))
                }
              >
                <option value="">未評価</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="add-book-form__field">
              <label htmlFor="book-finished-at">読了日</label>
              <input
                id="book-finished-at"
                name="finishedAt"
                type="date"
                value={formState.finishedAt}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    finishedAt: event.target.value,
                  }))
                }
              />
            </div>
            <div className="add-book-form__field add-book-form__field--wide">
              <label htmlFor="book-note">メモ</label>
              <textarea
                id="book-note"
                name="note"
                value={formState.note}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    note: event.target.value,
                  }))
                }
                rows={3}
              />
            </div>
          </div>
          <button type="submit" className="add-book-form__submit">
            本を追加
          </button>
        </form>
      )}
    </section>
  );
}

export default AddBookForm;
