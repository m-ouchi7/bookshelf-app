import { Link } from "react-router-dom";
import { bookFieldLabels, readingStatusLabels, type Book } from "../types/book";
import { formatDate } from "../utils/dateFormat";

type BookCardProps = {
  book: Book;
};

function BookCard({ book }: BookCardProps) {
  return (
    <article className="book-card">
      <div className="book-card__header">
        <div>
          <p className="book-card__status">
            {readingStatusLabels[book.status]}
          </p>
          <h2>
            <Link className="book-card__title-link" to={`/books/${book.id}`}>
              {book.title}
            </Link>
          </h2>
        </div>
      </div>

      <dl className="book-card__details">
        <div>
          <dt>{bookFieldLabels.author}</dt>
          <dd>{book.author}</dd>
        </div>
        <div>
          <dt>{bookFieldLabels.publisher}</dt>
          <dd>{book.publisher ?? "未登録"}</dd>
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
          <dd>{book.finishedAt ? formatDate(book.finishedAt) : "未登録"}</dd>
        </div>
      </dl>
    </article>
  );
}

export default BookCard;
