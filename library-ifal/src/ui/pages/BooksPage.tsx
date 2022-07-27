import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookDTO from "../../core/dto/BookDTO";

import { useFetch } from "../../hooks/useFetch";

import api from "../../services/api";

import Book from "../components/Book";
import Button from "../components/Button";
import Header from "../components/Header";

import styles from '../styles/pages/BooksPage.module.scss'

function BooksPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const { data: booksAsList } = useFetch<BookDTO[]>('/books')
  const [books, setBooks] = useState<BookDTO[]>([])
  
  const handleListBooks = useCallback(() => {
    const isEmpty = !booksAsList?.length

    if (booksAsList && !isEmpty) {
      setBooks(booksAsList)
    }
  }, [booksAsList])

  const handleSearchBook = useCallback(async () => {
    const { data } = await api.get<BookDTO[]>(`/books/search?s=${inputRef.current?.value}`)
    const query = inputRef.current?.value
    const isQueryEmpty = !query?.length
    const isArrayEmpty = !data?.length

    if (!isQueryEmpty && !isArrayEmpty) {
      setBooks(data)
    }
  }, [])

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
          <Button
            type='button'
            btnType="secondary"
            onClick={goBackToHome}
          >
            Voltar
          </Button>
          <h2>Leaf book</h2>
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
