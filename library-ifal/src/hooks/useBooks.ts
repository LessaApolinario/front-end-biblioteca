import { useState } from 'react'

import Book from '../core/domain/models/Book'

import BookService from '../services/BookService'

import { useNotifications } from './useNotifications'

export function useBooks() {
  const { notifySuccess, notifyError } = useNotifications()
  const [books, setBooks] = useState<Book[]>([])

  async function listBooks(): Promise<void> {
    try {
      const bookService = new BookService()
      const booksList = await bookService.fetch()
      const isEmpty = !booksList?.length

      if (booksList && !isEmpty) {
        setBooks(booksList)
        notifySuccess('Livros listados com sucesso!')
      }
    } catch (error) {
      notifyError('Erro ao listar livros')
    }
  }

  async function searchBooks(query: string): Promise<void> {
    try {
      const bookService = new BookService()
      const books = await bookService.search(query)
      const isEmpty = !books.length

      if (!isEmpty) {
        setBooks(books)
        notifySuccess('Livros buscados com sucesso!')
      }
    } catch (error) {
      notifyError('Erro ao buscar livros')
    }
  }

  return {
    books,
    listBooks,
    searchBooks
  }
}
