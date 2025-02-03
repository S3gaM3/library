// pages/Home.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBooks } from '../features/booksSlice.ts';
import { fetchBooks } from '../services/bookService.ts';
import BookList from '../components/BookList.tsx';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Загрузка книг при монтировании компонента
    const loadBooks = async () => {
      const books = await fetchBooks('harry potter');  // Пример поиска книг
      dispatch(setBooks(books));
    };

    loadBooks();
  }, [dispatch]);

  return (
    <div className="home">
      <h1>Welcome to the Library</h1>
      <BookList />
    </div>
  );
};

export default Home;
