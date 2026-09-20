import type { ChangeEvent } from "react";
import type { Book, ReadingStatus } from "../types/book";

type BookCardProps = {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onDelete: (id: string) => void;
};

const statusLabels: Record<ReadingStatus, string> = {
  unread: "未読",
  reading: "読中",
  completed: "読了",
};

function BookCard({ book, onStatusChange, onDelete }: BookCardProps) {
  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(book.id, event.target.value as ReadingStatus);
  };

  return (
    <article className="book-card">
      <div className="book-card__header">
        <div>
          <p className="book-card__status">{statusLabels[book.status]}</p>
          <h2>{book.title}</h2>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(book.id)}
        >
          削除
        </button>
      </div>

      <dl className="book-card__details">
        <div>
          <dt>著者</dt>
          <dd>{book.author}</dd>
        </div>
        <div>
          <dt>出版社</dt>
          <dd>{book.publisher ?? "未登録"}</dd>
        </div>
        <div>
          <dt>評価</dt>
          <dd>
            {book.evaluation
              ? `${"★".repeat(book.evaluation)}${"☆".repeat(
                  5 - book.evaluation
                )}`
              : "未評価"}
          </dd>
        </div>
        <div>
          <dt>読了日</dt>
          <dd>{book.finishedAt ?? "未読了"}</dd>
        </div>
      </dl>

      <label className="book-card__status-control">
        ステータス
        <select value={book.status} onChange={handleStatusChange}>
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </article>
  );
}

export default BookCard;
