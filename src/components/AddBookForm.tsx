import { useState, type FormEvent } from "react";
import BookFormFields from "./BookFormFields";
import {
  createBookInputSchema,
  type BookFormState,
  type CreateBookInput,
} from "../types/book";

type AddBookFormProps = {
  onAddBook: (input: CreateBookInput) => Promise<boolean>;
  initialValue?: BookFormState;
  submitLabel?: string;
};

const initialFormState: BookFormState = {
  title: "",
  author: "",
  publisher: "",
  status: "unread",
  evaluation: "",
  finishedAt: "",
  note: "",
};

function AddBookForm({
  onAddBook,
  initialValue = initialFormState,
  submitLabel = "本を追加",
}: AddBookFormProps) {
  const [formState, setFormState] = useState<BookFormState>(initialValue);
  const [formError, setFormError] = useState("");

  const updateField = <K extends keyof BookFormState>(
    field: K,
    value: BookFormState[K],
  ) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setFormError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedInput = createBookInputSchema.safeParse({
      title: formState.title,
      author: formState.author,
      publisher: formState.publisher.trim() || undefined,
      status: formState.status,
      evaluation: formState.evaluation
        ? Number(formState.evaluation)
        : undefined,
      finishedAt: formState.finishedAt || undefined,
      note: formState.note.trim() || undefined,
    });
    if (!parsedInput.success) {
      setFormError(
        parsedInput.error.issues.map((issue) => issue.message).join(" "),
      );
      return;
    }

    const succeeded = await onAddBook(parsedInput.data);
    if (succeeded) {
      setFormState(initialValue);
      setFormError("");
    }
  };

  return (
    <section className="add-book-form-container" aria-label="本の追加">
      <form id="book-form" className="book-form" onSubmit={handleSubmit}>
        <BookFormFields
          formState={formState}
          onChange={updateField}
          idPrefix="book"
        />
      </form>
      {formError && (
        <p className="inline-error" role="alert">
          {formError}
        </p>
      )}
      <button type="submit" form="book-form" className="book-form__submit">
        {submitLabel}
      </button>
    </section>
  );
}

export default AddBookForm;
