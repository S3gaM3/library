// src/pages/BookDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Библиотека для работы с API

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);  // Здесь будет храниться информация о книге
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <h3>by {book.authors && book.authors[0].name}</h3>
      <p>{book.description ? book.description.value : 'No description available'}</p>

      {/* Здесь вы можете добавить ссылку на PDF или текстовый контент */}
      <div>
        {/* Пример ссылки на PDF */}
        <a href={`https://archive.org/download/${book.cover_id}/book.pdf`} target="_blank" rel="noopener noreferrer">
          Читать книгу
        </a>
      </div>
    </div>
  );
};

export default BookDetail;
