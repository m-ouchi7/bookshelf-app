import type { BookFilterStatus } from "../hooks/useBooks";
import { readingStatusLabels, readingStatusSchema } from "../types/book";

type BookFilterProps = {
  searchQuery: string;
  onSearchQueryChange: (searchQuery: string) => void;
  filterStatus: BookFilterStatus;
  onFilterStatusChange: (filterStatus: BookFilterStatus) => void;
};

function BookFilter({
  searchQuery,
  onSearchQueryChange,
  filterStatus,
  onFilterStatusChange,
}: BookFilterProps) {
  const handleFilterStatusChange = (value: string) => {
    if (value === "all") {
      onFilterStatusChange("all");
      return;
    }

    const parsedStatus = readingStatusSchema.safeParse(value);
    if (parsedStatus.success) {
      onFilterStatusChange(parsedStatus.data);
    }
  };

  return (
    <section className="book-filter" aria-label="本の絞り込み">
      <label>
        キーワード検索
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="タイトルまたは著者名"
        />
      </label>
      <label>
        ステータス
        <select
          value={filterStatus}
          onChange={(event) => handleFilterStatusChange(event.target.value)}
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
