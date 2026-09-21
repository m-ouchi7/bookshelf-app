export function reportError(message: string, error: unknown) {
  console.error(message, error);
  alert(message);
}
