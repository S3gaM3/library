import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../features/booksSlice';
import { RootState } from '../store/store';
import { fetchBooks } from '../services/bookService';
import BookCard from '../components/BookCard';

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.list);

  useEffect(() => {
    fetchBooks().then((data) => dispatch(setBooks(data)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Электронная библиотека</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
