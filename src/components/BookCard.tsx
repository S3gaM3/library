// src/components/BookCard.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favoritesSlice.ts';
import { Book } from '../types.ts';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const dispatch = useDispatch();

  const handleFavoriteToggle = () => {
    if (isFavorite(book.id)) {
      dispatch(removeFavorite(book.id));
    } else {
      dispatch(addFavorite(book));
    }
  };

  const isFavorite = (id: string) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some((item: Book) => item.id === id);
  };

  return (
    <div className="border p-4 rounded-lg">
      <img src={book.cover} alt={book.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
      <p className="text-sm text-gray-500">{book.author}</p>
      <button
        onClick={handleFavoriteToggle}
        className="mt-2 text-blue-500"
      >
        {isFavorite(book.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
      </button>
    </div>
  );
};

export default BookCard;
