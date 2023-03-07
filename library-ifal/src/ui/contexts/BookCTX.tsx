import { ReactNode, createContext, useState } from 'react';

import isEmpty from '../../core/utils/isEmpty';

import Book from '../../core/domain/models/Book';

import WebDIContainer from '../../dicontainer/web';

import { useNotifications } from '../../hooks/useNotifications';

interface BookCTXProps {
  books?: Book[];
  fetch(): Promise<void>;
  search(query: string): Promise<void>;
}

interface BookProviderProps {
  children: ReactNode;
}

export const BookCTX = createContext({} as BookCTXProps);

function BookProvider({ children }: BookProviderProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const { notifyError, notifySuccess } = useNotifications();

  async function fetch() {
    try {
      const webDiContainer = new WebDIContainer();
      const bookService = webDiContainer.getBookService();
      const books = await bookService.fetch();

      if (!isEmpty(books)) {
        setBooks(books);
        notifySuccess('Livros listados com sucesso!');
      }
    } catch (error) {
      notifyError('Erro ao listar livros');
    }
  }

  async function search(query: string) {
    try {
      const webDiContainer = new WebDIContainer();
      const bookService = webDiContainer.getBookService();
      const books = await bookService.search(query);

      if (!isEmpty(books)) {
        setBooks(books);
        notifySuccess('Livros buscados com sucesso!');
      }
    } catch (error) {
      notifyError('Erro ao buscar livros');
    }
  }

  return (
    <BookCTX.Provider value={{ books, fetch, search }}>
      {children}
    </BookCTX.Provider>
  );
}

export default BookProvider;
