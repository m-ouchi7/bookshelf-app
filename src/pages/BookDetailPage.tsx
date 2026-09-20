import { Link, useParams } from "react-router-dom";
import { readingStatusLabels, type Book } from "../types/book";

type BookDetailPageProps = {
  getBookById: (id: string) => Book | undefined;
};

function BookDetailPage({ getBookById }: BookDetailPageProps) {
  const { id } = useParams();
  const book = id ? getBookById(id) : undefined;

  if (!book) {
    return (
      <main className="page-shell">
        <p className="empty-state">該当する本が見つかりません。</p>
        <Link className="secondary-button" to="/">
          ← 一覧へ戻る
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="page-actions">
        <Link className="secondary-button" to="/">
          ← 一覧へ戻る
        </Link>
        <Link className="primary-button" to={`/books/${book.id}/edit`}>
          編集
        </Link>
      </div>

      <article className="book-detail">
        <p className="book-card__status">{readingStatusLabels[book.status]}</p>
        <h1>{book.title}</h1>
        <dl className="book-detail__details">
          <div>
            <dt>著者</dt>
            <dd>{book.author}</dd>
          </div>
          <div>
            <dt>出版社</dt>
            <dd>{book.publisher ?? "未登録"}</dd>
          </div>
          <div>
            <dt>読書ステータス</dt>
            <dd>{readingStatusLabels[book.status]}</dd>
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
            <dt>日付</dt>
            <dd>{book.finishedAt ?? "未登録"}</dd>
          </div>
          <div>
            <dt>メモ</dt>
            <dd>{book.note ?? "未登録"}</dd>
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
      </article>
    </main>
  );
}

export default BookDetailPage;
