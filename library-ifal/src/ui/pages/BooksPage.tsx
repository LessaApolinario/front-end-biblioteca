import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookDTO from "../../core/dto/BookDTO";
import api from "../../services/api";

import Book from "../components/Book";
import Button from "../components/Button";
import Header from "../components/Header";

import styles from '../styles/pages/BooksPage.module.scss'

function BooksPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [books, setBooks] = useState<BookDTO[]>([])
  const navigate = useNavigate()

  const getBooks = async () => {
    try {
      const response = await api.get<BookDTO[]>('/book')
      console.log('Promise:', response)
      const { data, status, statusText } = response
      console.log('Dados:',data)

      if (status === 200 && statusText === 'OK') {
        return data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filterBooks = useCallback((books: BookDTO[], bookTitle: string) => {
    return books.filter(({ title }) => title.toLowerCase() === bookTitle.toLowerCase())
  }, [])
  
  const insertBooks = useCallback((book: BookDTO, key: number) => {
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
  
  const listBooks = useCallback((myInputRef: React.RefObject<HTMLInputElement>, books: BookDTO[]) =>{
    const input = myInputRef.current
    const title = input?.value
    return title ? filterBooks(books, title) : []
  }, [filterBooks])

  const searchBooks = useCallback(async () => {
    const books = await getBooks()

    if (typeof books !== 'undefined') {
      // const resolveAllBookPromises = await Promise.all(books)
      console.log(books)
      setBooks(books)
    }
  }, [])

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
      <Header>
        <nav className={styles.navbar}>
          <Button type='button' onClick={goBackToHome}>Voltar</Button>
          <h2>Livros</h2>
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
