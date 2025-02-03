import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer from '../features/reviewsSlice.ts';
import booksReducer from '../features/booksSlice.ts';
import authReducer from '../features/authSlice.ts';

// Создаем store с использованием configureStore
export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    reviews: reviewsReducer,
  },
});

// Определяем тип RootState
export type RootState = ReturnType<typeof store.getState>;

// Определяем тип dispatch
export type AppDispatch = typeof store.dispatch;

export default store;
