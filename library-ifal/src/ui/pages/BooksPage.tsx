import React, { useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Book from "../../core/domain/models/Book"
import BookService from "../../services/BookService"

import BookItem from "../components/BookItem"
import Button from "../components/Button"
import Header from "../components/Header"

import styles from '../styles/pages/BooksPage.module.scss'

function BooksPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const [books, setBooks] = useState<Book[]>([])

  const handleListBooks = useCallback(async () => {
    const bookService = new BookService()
    const booksList = await bookService.fetch()
    const isEmpty = !booksList?.length

    if (booksList && !isEmpty) {
      setBooks(booksList)
    }
  }, [])

  const handleSearchBook = useCallback(async () => {
    const query = inputRef.current?.value

    if (!query) {
      return
    }

    if (!query?.length) {
      return
    }

    const bookService = new BookService()
    const data = await bookService.search(query)

    if (!data.length) {
      return
    }

    setBooks(data)
  }, [])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <div className={styles.container}>
      <Header>
        <nav className={styles.navbar}>
          <Button
            type='button'
            btnType="secondary"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
          <h2>SIB</h2>
        </nav>
      </Header>

      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.search}>
          <input
            ref={inputRef}
            type='text'
            placeholder='Buscar ou listar livros'
            name='search'
          />

          <div className={styles.buttons}>
            <Button
              type='submit'
              btnType='primary'
              onClick={handleSearchBook}
            >
              Pesquisar livros
            </Button>
            <Button
              type='submit'
              btnType='primary'
              onClick={handleListBooks}
            >
              Listar livros
            </Button>
          </div>
        </div>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Edição</th>
            <th>Ano</th>
            <th>Localização</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book, index) => {
            const { titulo, autor, edicao, ano, localizacao } = book
            return <BookItem
              key={index}
              title={titulo ?? ''}
              author={autor ?? ''}
              edition={edicao ?? ''}
              year={ano ?? ''}
              localization={localizacao ?? ''}
            />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BooksPage
