import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  cover: string;
}

interface BooksState {
  list: Book[];
}

const initialState: BooksState = {
  list: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;
