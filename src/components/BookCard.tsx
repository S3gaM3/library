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

  // Если книга имеет cover_id, формируем ссылку на картинку
  const coverImage = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/128x193.png?text=No+Image';

  // Проверяем, существует ли key, чтобы избежать undefined
  const bookLink = book.key ? `https://openlibrary.org${book.key}` : '';

  // Логирование для отладки
  console.log('Book:', book);
  console.log('Book Link:', bookLink);  // Выведем ссылку для диагностики

  return (
    <div className="border p-4 rounded-lg">
      <img
        src={coverImage}
        alt={book.title}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
      <p className="text-sm text-gray-500">{book.author_name ? book.author_name.join(', ') : 'Автор не найден'}</p>
      
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={handleFavoriteToggle}
          className="text-blue-500"
        >
          {isFavorite(book.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
        </button>

        {/* Кнопка для перехода к чтению книги, только если есть валидный bookLink */}
        {bookLink ? (
          <a
            href={bookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white py-1 px-4 rounded"
          >
            Читать
          </a>
        ) : (
          <p>Ссылка на книгу недоступна</p>  // Если ключ отсутствует, выводим это сообщение
        )}
      </div>
    </div>
  );
};

export default BookCard;
