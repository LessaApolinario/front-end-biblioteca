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
  const { data: books } = useFetch<BookDTO[]>('/book')
  const [foundedBooks, setFoundedBooks] = useState<BookDTO[]>([])

  // TODO:: see if this function is really necessary
  const insertBooks = (foundedBooks?: BookDTO[]) => {
    return foundedBooks?.map(book => {
      const { titulo, autor, edicao, ano, localizacao } = book
      return <Book
        key={titulo}
        title={titulo}
        author={autor}
        edition={edicao}
        year={ano}
        localization={localizacao}
        />
    })
  }
  
  const loadBooksOnSearch = useCallback((inputRef: React.RefObject<HTMLInputElement>) => {
      const query = inputRef.current?.value
  
      if (query) {
        const booksByTitle = books
          ?.filter(({ titulo }) => titulo?.toUpperCase() === query.toUpperCase())
        // const booksByAuthor = books
        //   ?.filter(({ author }) => author.toUpperCase() === query.toUpperCase())
        // const booksByEdition = books
        //   ?.filter(({ edition })=> edition.toUpperCase() === query.toUpperCase())
        // const booksByYear = books
        //   ?.filter(({ year }) => year.toLowerCase() === query.toUpperCase())
        
        // const foundedBooks = booksByTitle || booksByAuthor || booksByEdition || booksByYear
        // return foundedBooks
        if (booksByTitle) {
          setFoundedBooks(booksByTitle)
        }
      }
    
  }, [books])

  useEffect(() => {
    loadBooksOnSearch(inputRef)
  }, [loadBooksOnSearch])

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
            <Button type='submit' onClick={() => loadBooksOnSearch(inputRef)}>Pesquisar livros</Button>
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
          {/* {insertBooks(foundedBooks)} */}
          {foundedBooks?.map(book => {
            return <Book
              key={Math.random() * 9}
              title={book.titulo}
              author={book.autor}
              edition={book.edicao}
              year={book.ano}
              localization={book.localizacao}
            />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BooksPage
