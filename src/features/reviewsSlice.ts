import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
  bookId: string;
  userId: string;
  rating: number;  // 1-5 звезд
  comment: string;
}

interface ReviewsState {
  reviews: Review[];
}

const initialState: ReviewsState = {
  reviews: [],
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      const { bookId, userId } = action.payload;

      // Проверяем, есть ли уже отзыв от этого пользователя для данной книги
      const existingReview = state.reviews.find(
        (review) => review.bookId === bookId && review.userId === userId
      );

      if (existingReview) {
        // Если отзыв уже есть, не добавляем новый, можно добавить логику обновления
        console.warn('Отзыв уже существует');
      } else {
        // Добавляем новый отзыв
        state.reviews.push(action.payload);
      }
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    updateReview: (state, action: PayloadAction<Review>) => {
      const index = state.reviews.findIndex(
        (review) => review.bookId === action.payload.bookId && review.userId === action.payload.userId
      );
      
      if (index !== -1) {
        // Обновляем существующий отзыв
        state.reviews[index] = action.payload;
      }
    },
  },
});

export const { addReview, setReviews, updateReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
