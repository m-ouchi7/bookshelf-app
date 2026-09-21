import type { ReadingStatus } from "../types/book";
import { readingStatusLabels } from "../types/book";

type StatusTabsProps = {
  value: ReadingStatus;
  onChange: (value: ReadingStatus) => void;
  label?: string;
};

function StatusTabs({
  value,
  onChange,
  label = "ステータス",
}: StatusTabsProps) {
  return (
    <div className="status-tabs" role="tablist" aria-label={label}>
      {Object.entries(readingStatusLabels).map(([status, statusLabel]) => {
        const isSelected = status === value;
        return (
          <button
            key={status}
            type="button"
            className={`status-tab${isSelected ? " status-tab--selected" : ""}`}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(status as ReadingStatus)}
          >
            <span className="status-tab__label">{statusLabel}</span>
          </button>
        );
      })}
    </div>
  );
}

export default StatusTabs;
