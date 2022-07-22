import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Book from "../components/Book";
import Button from "../components/Button";

import styles from '../styles/pages/BooksPage.module.scss'

type Book = {
  title: string
  author: string
  edition: string
  year: string
  localization: string
}

function BooksPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [books, setBooks] = useState<Book[]>([])
  const navigate = useNavigate()

  const filterBooks = useCallback((books: Book[], bookTitle: string) => {
    return books.filter(({ title }) => title === bookTitle)
  }, [])
  
  const insertBooks = useCallback((book: Book, key: number) => {
    const { title, author, edition, year, localization } = book
    return <Book
      key={key}
      title={title}
      author={author}
      edition={edition}
      year={year}
      localization={localization}
      />
  }, [])
  
  const listBooks = useCallback((myInputRef: React.RefObject<HTMLInputElement>, books: Book[]) =>{
    const input = myInputRef.current
    const title = input?.value
    return title ? filterBooks(books, title) : []
  }, [filterBooks])

  const searchBooks = useCallback(() => {
    const booksExample: Book[] = [
      {
        title: 'Livro 1',
        author: 'Autor 1',
        edition: 'ed. 1',
        year: '2001',
        localization: '823 O79m ex.1'
      },
      {
        title: 'Livro 1',
        author: 'Autor 1',
        edition: 'ed. 1',
        year: '2001',
        localization: '823 O79m ex.1'
      },
      {
        title: 'Livro 1',
        author: 'Autor 1',
        edition: 'ed. 1',
        year: '2001',
        localization: '823 O79m ex.1'
      },
      {
        title: 'Livro 2',
        author: 'Autor 2',
        edition: 'ed. 2',
        year: '2002',
        localization: '823 O79m ex.2'
      },
      {
        title: 'Livro 3',
        author: 'Autor 3',
        edition: 'ed. 3',
        year: '2003',
        localization: '823 O79m ex.3'
      },
      {
        title: 'Livro 4',
        author: 'Autor 4',
        edition: 'ed. 4',
        year: '2004',
        localization: '823 O79m ex.4'
      }
    ]

    const booksAsArray = listBooks(inputRef, booksExample)
    setBooks(booksAsArray)
  }, [listBooks])

  useEffect(() => {
    searchBooks()
  }, [searchBooks])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  function goBackToHome() {
    navigate('/home')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Button type='button' onClick={goBackToHome}>Voltar</Button>
          <h2>Livros</h2>
        </nav>
      </header>
      
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.search}>
          <input
            ref={inputRef}
            type='text'
            placeholder='Buscar ou listar livros'
            name='search'
          />

          <div className={styles.buttons}>
            <Button type='submit' onClick={() => searchBooks()}>Pesquisar livros</Button>
            <Button type='submit' onClick={() => console.log('listAll')}>Listar livros</Button>
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
          {books?.map((book, index) => insertBooks(book, index))}
        </tbody>
      </table>
    </div>
  )
}

export default BooksPage
