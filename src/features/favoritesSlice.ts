// features/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface FavoritesState {
  favorites: Book[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Book>) => {
      // Добавляем книгу в избранное, если ее нет
      if (!state.favorites.some(book => book.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      // Удаляем книгу из избранного по id
      state.favorites = state.favorites.filter(book => book.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
