import { useState } from 'react'

import Book from '../core/domain/models/Book'

import BookService from '../services/BookService'

import { toast } from 'react-toastify'

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])

  async function listBooks(): Promise<void> {
    try {
      const bookService = new BookService()
      const booksList = await bookService.fetch()
      const isEmpty = !booksList?.length

      if (booksList && !isEmpty) {
        setBooks(booksList)
        toast.success('Livros listados com sucesso!', {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    } catch (error) {
      toast.error('Erro ao listar livros', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  async function searchBooks(query: string): Promise<void> {
    try {
      const bookService = new BookService()
      const books = await bookService.search(query)
      const isEmpty = !books.length

      if (!isEmpty) {
        setBooks(books)
        toast.success('Livros buscados com sucesso!', {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    } catch (error) {
      toast.error('Erro ao buscar livros', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  return {
    books,
    listBooks,
    searchBooks
  }
}
