import { useState } from 'react';

import Book from '../core/domain/models/Book';

import { useNotifications } from './useNotifications';

import WebDIContainer from '../dicontainer/web';

export function useBooks() {
  const { notifySuccess, notifyError } = useNotifications();
  const [books, setBooks] = useState<Book[]>([]);
  const diContainer = new WebDIContainer();
  const service = diContainer.getBookService();

  async function listBooks(): Promise<void> {
    try {
      const books = await service.fetch();
      const isEmpty = !books?.length;

      if (books && !isEmpty) {
        setBooks(books);
        notifySuccess('Livros listados com sucesso!');
      }
    } catch (error) {
      notifyError('Erro ao listar livros');
    }
  }

  async function searchBooks(query: string): Promise<void> {
    try {
      const books = await service.search(query);
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
  };
}
