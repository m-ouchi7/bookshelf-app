import { z } from "zod";

export function formatErrorMessage(message: string, error: unknown) {
  if (!(error instanceof z.ZodError)) return message;

  const details = error.issues
    .map((issue) => {
      const field = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
      return `${field}${issue.message}`;
    })
    .join("\n");

  return `${message}\n${details}`;
}
