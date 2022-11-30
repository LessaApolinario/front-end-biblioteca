import { ReactNode, useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Book from "../../core/domain/models/Book"
import BookService from "../../services/BookService"
import BookComponent from "../components/BookComponent"

import Button from "../components/Button"
import Header from "../components/Header"
import Table from "../components/Table"

import styles from '../styles/pages/BooksPage.module.scss'

function BooksPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const [books, setBooks] = useState<Book[]>([])

  const columns = [
    "Título",
    "Autor",
    "Edição",
    "Ano",
    "Localização"
  ]

  const keyExtractor = (item: Book): string => String(item._id)

  const renderItem = (item: Book, key: string): ReactNode => {
    return <BookComponent  props={item} key={key} />
  }

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

    if (!query || query.length === 0) {
      return
    }

    const bookService = new BookService()
    const books = await bookService.search(query)
    const isEmpty = !books.length

    if (!isEmpty) {
      setBooks(books)
    }
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

      <Table<Book>
        className={styles.table}
        data={books}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        columns={columns} />
    </div>
  )
}

export default BooksPage
