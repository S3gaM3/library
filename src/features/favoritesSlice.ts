import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  cover: string;
}

interface FavoritesState {
  list: Book[];
}

const loadFavoritesFromLocalStorage = (): Book[] => {
  try {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Ошибка при загрузке данных из localStorage', error);
    return [];
  }
};

const initialState: FavoritesState = {
  list: loadFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Book>) => {
      // Проверяем, если книга уже есть в избранных
      const isAlreadyFavorite = state.list.some((book) => book.id === action.payload.id);
      if (!isAlreadyFavorite) {
        state.list.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.list));
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((book) => book.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.list));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
