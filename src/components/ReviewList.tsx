// src/components/ReviewList.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../features/reviewsSlice.ts';

interface ReviewListProps {
  bookId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ bookId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (comment.trim()) {
      const newReview = { bookId, userId: 'user123', rating, comment };
      dispatch(addReview(newReview));
      setComment('');
      setRating(0);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Отзывы и Рейтинг</h3>
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Оставьте свой отзыв..."
        className="w-full p-2 border rounded mb-4"
      />
      <button onClick={handleSubmit} className="btn-primary">
        Оставить отзыв
      </button>

      <div className="mt-6">
        {/* Отображение всех отзывов */}
      </div>
    </div>
  );
};

export default ReviewList;
