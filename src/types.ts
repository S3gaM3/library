// types/index.ts
export interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string | null;  // Может быть null, если изображения нет
  description: string;
}
