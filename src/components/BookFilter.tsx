import type { Dispatch, SetStateAction } from "react";
import type { BookFilterStatus } from "../hooks/useBooks";
import { readingStatusLabels } from "../types/book";

type BookFilterProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filterStatus: BookFilterStatus;
  setFilterStatus: Dispatch<SetStateAction<BookFilterStatus>>;
};

function BookFilter({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}: BookFilterProps) {
  return (
    <section className="book-filter" aria-label="本の絞り込み">
      <label>
        キーワード検索
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="タイトルまたは著者名"
        />
      </label>
      <label>
        ステータス
        <select
          value={filterStatus}
          onChange={(event) =>
            setFilterStatus(event.target.value as BookFilterStatus)
          }
        >
          <option value="all">すべて</option>
          {Object.entries(readingStatusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default BookFilter;
