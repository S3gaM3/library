// features/booksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface BooksState {
  items: Book[];
}

const initialState: BooksState = {
  items: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;
