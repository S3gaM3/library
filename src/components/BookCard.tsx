import { Link } from 'react-router-dom';

interface BookProps {
  book: {
    id: string;
    title: string;
    author: string;
    cover: string;
  };
}

const BookCard = ({ book }: BookProps) => {
  return (
    <div className="border rounded-lg shadow-lg p-4">
      <img src={book.cover} alt={book.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
      <p className="text-sm text-gray-600">Автор: {book.author}</p>
      <Link to={`/book/${book.id}`} className="mt-4 inline-block text-blue-500">
        Подробнее →
      </Link>
    </div>
  );
};

export default BookCard;
