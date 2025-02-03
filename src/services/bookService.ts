// services/bookService.ts
import axios from 'axios';
import { Book } from '../types';

const apiUrl = 'https://openlibrary.org/search.json';

export const fetchBooks = async (query: string): Promise<Book[]> => {
  try {
    const response = await axios.get(`${apiUrl}?q=${query}`);
    return response.data.docs.map((doc: any) => ({
      id: doc.key,
      title: doc.title,
      author: doc.author_name?.[0] || 'Unknown',
      imageUrl: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : null,
      description: doc.first_sentence?.[0] || 'No description available',
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
