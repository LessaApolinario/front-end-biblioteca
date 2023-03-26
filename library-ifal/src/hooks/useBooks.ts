import { useCallback, useContext } from 'react';

import { BookCTX } from '../ui/contexts/BookCTX';

export function useBooks() {
  const bookCTX = useContext(BookCTX);

  const fetch = useCallback(() => fetchBooks(), [fetchBooks]);

  async function fetchBooks() {
    await bookCTX.fetch();
  }

  const search = useCallback((query: string) => searchBooks(query), []);

  async function searchBooks(query: string) {
    await bookCTX.search(query);
  }

  const getBooks = useCallback(
    () => ({ books: bookCTX.books }),
    [bookCTX.books]
  );

  return {
    getBooks,
    fetch,
    search,
  };
}
