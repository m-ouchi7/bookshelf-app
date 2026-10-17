import { z } from "zod";

export function reportError(message: string, error: unknown) {
  console.error(message, error);

  if (error instanceof z.ZodError) {
    const details = error.issues
      .map((issue) => {
        const field = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
        return `${field}${issue.message}`;
      })
      .join("\n");
    alert(`${message}\n${details}`);
    return;
  }

  alert(message);
}
