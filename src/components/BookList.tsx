// components/BookList.tsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';  // Redux store для получения списка книг
import { Book } from '../types';  // Тип данных книги
import BookCard from './BookCard.tsx';  // Компонент для отображения одной книги

const BookList = () => {
  const books = useSelector((state: RootState) => state.books.items); // Получаем список книг из Redux
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

  // Фильтруем книги по названию
  const filteredBooks = books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Поиск */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Список книг */}
      <div className="book-list">
        {filteredBooks.length === 0 ? (
          <p>No books found</p>  // Если нет книг по запросу, показываем сообщение
        ) : (
          filteredBooks.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;
