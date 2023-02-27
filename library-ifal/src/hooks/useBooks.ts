import { createRef, useCallback, useState } from 'react';

// TODO:: REFACTOR THIS HOOK PLEASE

import Book from '../core/domain/models/Book';

import { useNotifications } from './useNotifications';

import WebDIContainer from '../dicontainer/web';

export function useBooks() {
  const { notifySuccess, notifyError } = useNotifications();
  const [books, setBooks] = useState<Book[]>([]);
  const searchRef = createRef<HTMLInputElement>();

  const listBooks = useCallback(async () => {
    await list();
  }, []);

  async function list(): Promise<void> {
    try {
      const webDiContainer = new WebDIContainer();
      const bookService = webDiContainer.getBookService();
      const books = await bookService.fetch();
      const isEmpty = !books?.length;

      if (books && !isEmpty) {
        setBooks(books);
        notifySuccess('Livros listados com sucesso!');
      }
    } catch (error) {
      notifyError('Erro ao listar livros');
    }
  }

  const searchBooks = useCallback(async () => {
    const searchInput = searchRef?.current;
    const query = searchInput?.value ?? '';
    await search(query);
  }, []);

  async function search(query: string): Promise<void> {
    try {
      const webDiContainer = new WebDIContainer();
      const bookService = webDiContainer.getBookService();
      const books = await bookService.search(query);
      const isEmpty = !books.length;

      if (!isEmpty) {
        setBooks(books);
        notifySuccess('Livros buscados com sucesso!');
      }
    } catch (error) {
      notifyError('Erro ao buscar livros');
    }
  }

  return {
    books,
    listBooks,
    searchBooks,
    refs: { searchRef },
  };
}
