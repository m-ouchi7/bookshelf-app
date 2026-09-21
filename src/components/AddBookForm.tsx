import { useState, type FormEvent } from "react";
import BookFormFields from "./BookFormFields";
import type { BookFormState, CreateBookInput } from "../types/book";

type AddBookFormProps = {
  onAddBook: (input: CreateBookInput) => void;
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

  const updateField = <K extends keyof BookFormState>(
    field: K,
    value: BookFormState[K]
  ) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = formState.title.trim();
    const author = formState.author.trim();
    if (!title || !author) return;

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
    setFormState(initialValue);
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
      <button type="submit" form="book-form" className="book-form__submit">
        {submitLabel}
      </button>
    </section>
  );
}

export default AddBookForm;
