import type { Book } from "../types/book";

export const initialBooks: Book[] = [
  {
    id: "book-001",
    title: "吾輩は猫である",
    author: "夏目漱石",
    publisher: "新潮社",
    status: "completed",
    evaluation: 5,
    note: "何度読んでも発見がある作品。",
    finishedAt: "2026-09-12",
    createdAt: "2026-09-01T09:00:00.000Z",
    updatedAt: "2026-09-12T18:30:00.000Z",
  },
  {
    id: "book-002",
    title: "コンビニ人間",
    author: "村田沙耶香",
    publisher: "文藝春秋",
    status: "reading",
    createdAt: "2026-09-05T10:15:00.000Z",
    updatedAt: "2026-09-05T10:15:00.000Z",
  },
  {
    id: "book-003",
    title: "星の王子さま",
    author: "サン＝テグジュペリ",
    publisher: "岩波書店",
    status: "unread",
    note: "時間を作って読みたい本。",
    createdAt: "2026-09-10T07:45:00.000Z",
    updatedAt: "2026-09-10T07:45:00.000Z",
  },
];
