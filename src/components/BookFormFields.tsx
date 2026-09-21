import StarRating from "./StarRating";
import StatusTabs from "./StatusTabs";
import { bookFieldLabels, type BookFormState } from "../types/book";

type BookFormFieldsProps = {
  formState: BookFormState;
  onChange: <K extends keyof BookFormState>(
    field: K,
    value: BookFormState[K]
  ) => void;
  idPrefix: string;
};

function BookFormFields({
  formState,
  onChange,
  idPrefix,
}: BookFormFieldsProps) {
  return (
    <div className="book-form-fields">
      <div className="book-form-field">
        <label htmlFor={`${idPrefix}-title`}>{bookFieldLabels.title}</label>
        <input
          id={`${idPrefix}-title`}
          type="text"
          value={formState.title}
          required
          onChange={(event) => onChange("title", event.target.value)}
        />
      </div>
      <div className="book-form-field">
        <label htmlFor={`${idPrefix}-author`}>{bookFieldLabels.author}</label>
        <input
          id={`${idPrefix}-author`}
          type="text"
          value={formState.author}
          required
          onChange={(event) => onChange("author", event.target.value)}
        />
      </div>
      <div className="book-form-field">
        <label htmlFor={`${idPrefix}-publisher`}>
          {bookFieldLabels.publisher}
        </label>
        <input
          id={`${idPrefix}-publisher`}
          type="text"
          value={formState.publisher}
          onChange={(event) => onChange("publisher", event.target.value)}
        />
      </div>
      <div className="book-form-field">
        <span>{bookFieldLabels.status}</span>
        <StatusTabs
          value={formState.status}
          onChange={(value) => onChange("status", value)}
          label="ステータス"
        />
      </div>
      <div className="book-form-field">
        <span>{bookFieldLabels.evaluation}</span>
        <StarRating
          value={
            formState.evaluation ? Number(formState.evaluation) : undefined
          }
          onChange={(value) => onChange("evaluation", value?.toString() ?? "")}
        />
      </div>
      <div className="book-form-field">
        <label htmlFor={`${idPrefix}-finished-at`}>
          {bookFieldLabels.finishedAt}
        </label>
        <input
          id={`${idPrefix}-finished-at`}
          type="date"
          value={formState.finishedAt}
          onChange={(event) => onChange("finishedAt", event.target.value)}
        />
      </div>
      <div className="book-form-field book-form-field--wide">
        <label htmlFor={`${idPrefix}-note`}>{bookFieldLabels.note}</label>
        <textarea
          id={`${idPrefix}-note`}
          rows={6}
          value={formState.note}
          onChange={(event) => onChange("note", event.target.value)}
        />
      </div>
    </div>
  );
}

export default BookFormFields;
