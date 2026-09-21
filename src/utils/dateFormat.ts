function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function formatDate(value?: string): string {
  if (!value) return "未登録";

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return value;

  return `${match[1]}年${Number(match[2])}月${Number(match[3])}日`;
}

export function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日 ${pad(date.getHours())}時${pad(date.getMinutes())}分`;
}
