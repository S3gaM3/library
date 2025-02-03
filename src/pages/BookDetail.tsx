// src/pages/BookDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import ReviewList from '../components/ReviewList.tsx';
import DownloadButton from '../components/DownloadButton.tsx';

const BookDetail: React.FC = () => {
  const { id } = useParams();
  const book = useSelector((state: RootState) => state.books.list.find((b) => b.id === id));

  if (!book) {
    return <p>Книга не найдена.</p>;
  }

  return (
    <div className="p-6">
      <img src={book.cover} alt={book.title} className="w-48 h-64 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-lg text-gray-700 mt-2">Автор: {book.author}</p>
      <p className="mt-4">📖 {book.genre}</p>
      <DownloadButton fileUrl={book.cover} />
      <ReviewList bookId={book.id} />
    </div>
  );
};

export default BookDetail;
