type StarRatingProps = {
  value?: number;
  onChange?: (value: number | undefined) => void;
  label?: string;
};

function StarRating({ value, onChange, label = "評価" }: StarRatingProps) {
  const isEditable = Boolean(onChange);

  return (
    <span
      className="star-rating"
      role={isEditable ? "group" : undefined}
      aria-label={label}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = value !== undefined && star <= value;

        if (!isEditable) {
          return (
            <span className="star-rating__star" key={star} aria-hidden="true">
              {isFilled ? "★" : "☆"}
            </span>
          );
        }

        return (
          <button
            className="star-rating__star"
            key={star}
            type="button"
            aria-label={`${star}つ星${value === star ? "（選択解除）" : ""}`}
            aria-pressed={value === star}
            onClick={() => onChange?.(star === value ? undefined : star)}
          >
            {isFilled ? "★" : "☆"}
          </button>
        );
      })}
    </span>
  );
}

export default StarRating;
