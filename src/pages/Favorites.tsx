import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { removeFavorite } from '../features/favoritesSlice.ts';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.list);

  const handleRemove = (id: string) => {
    dispatch(removeFavorite(id));
  };

  if (favorites.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Избранные книги</h1>
        <p>В вашем списке избранных книг пока нет.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Избранные книги</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.map((book) => (
          <div key={book.id} className="border rounded-lg p-4">
            {/* Добавлен fallback для изображения */}
            <img
              src={book.cover || '/path/to/fallback-image.jpg'} // Здесь указываем путь к изображению по умолчанию
              alt={book.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
            <button
              onClick={() => handleRemove(book.id)}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

