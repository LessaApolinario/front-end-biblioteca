import { useCallback, useContext } from 'react';

import { BookCTX } from '../ui/contexts/BookCTX';

export function useBooks() {
  const bookCTX = useContext(BookCTX);

  const fetchBooks = useCallback(async () => {
    await bookCTX.fetch();
  }, []);

  const searchBooks = useCallback(async (query: string) => {
    await bookCTX.search(query);
  }, []);

  function getBooks() {
    return { books: bookCTX.books };
  }

  return {
    getBooks,
    fetchBooks,
    searchBooks,
  };
}
