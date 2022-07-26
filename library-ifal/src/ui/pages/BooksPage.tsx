import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookDTO from "../../core/dto/BookDTO";

import { useFetch } from "../../hooks/useFetch";

import Book from "../components/Book";
import Button from "../components/Button";
import Header from "../components/Header";

import styles from '../styles/pages/BooksPage.module.scss'

function BooksPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const { data: booksAsList } = useFetch<BookDTO[]>('/books')
  const { data: booksOnSearch } = useFetch<BookDTO[]>(`/books/search?s=${inputRef.current?.value}`)
  const [books, setBooks] = useState<BookDTO[]>([])
  
  const handleListBooks = useCallback(() => {
    const isEmpty = !booksAsList?.length

    if (booksAsList && !isEmpty) {
      setBooks(booksAsList)
    }
  }, [booksAsList])

  const handleSearchBook = useCallback((inputRef: React.RefObject<HTMLInputElement>) => {
    const query = inputRef.current?.value
    const isQueryEmpty = !query?.length
    const isArrayEmpty = !booksOnSearch?.length

    if (!isQueryEmpty && !isArrayEmpty) {
      setBooks(booksOnSearch)
    }
  }, [booksOnSearch])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  function goBackToHome() {
    navigate('/home')
  }

  useEffect(() => {
    handleSearchBook(inputRef)
  }, [handleSearchBook])

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
            <Button type='submit' onClick={() => handleSearchBook(inputRef)}>Pesquisar livros</Button>
            <Button type='submit' onClick={handleListBooks}>Listar livros</Button>
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
            return <Book
              key={index}
              title={titulo}
              author={autor}
              edition={edicao}
              year={ano}
              localization={localizacao}
            />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BooksPage
