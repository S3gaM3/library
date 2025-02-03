import React from 'react';
import { useParams } from 'react-router-dom';

const BookReader = () => {
  const { id } = useParams(); // Получаем ID книги из URL
  const bookLink = `https://openlibrary.org/works/${id}`;

  return (
    <div>
      <h1>Чтение книги</h1>
      <iframe
        src={bookLink} // Здесь можно использовать любую ссылку на книгу
        width="100%"
        height="600px"
        title="Чтение книги"
      />
    </div>
  );
};

export default BookReader;
