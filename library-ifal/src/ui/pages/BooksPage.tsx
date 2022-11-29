import { ReactNode, useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Book from "../../core/domain/models/Book"
import BookService from "../../services/BookService"

import Button from "../components/Button"
import Header from "../components/Header"
import Table from "../components/Table"

import styles from '../styles/pages/BooksPage.module.scss'
import cellStyles from '../styles/components/Cell.module.scss'

function BooksPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const [books, setBooks] = useState<Book[]>([])

  const thead = [
    "Título",
    "Autor",
    "Edição",
    "Ano",
    "Localização"
  ]

  const renderItem = (item: Book, key: number): ReactNode => {
    const formatAuthorName = (authorName: string | undefined) => {
      if (!authorName) {
        return '-'
      }

      const [lastName, firstName] = authorName.trim().split(',')

      return firstName ? `${firstName} ${lastName}` : lastName
    }

    return (
      <>
        <tr className={cellStyles.container} key={key}>
          <td>{item.autor}</td>
          <td>{formatAuthorName(item.autor)}</td>
          <td>{item.edicao}</td>
          <td>{item.ano ? item.ano = item.ano.replace('.', '') : '-'}</td>
          <td>
            <Button
              title='Informações sobre a localização dos livros'
              type='button'
              btnType="primary"
              onClick={
                () => console.log('redirecionando')
              }
            >
              {item.localizacao}
            </Button>
          </td>
        </tr>
      </>
    )
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
        thead={thead}
        data={books}
        renderItem={renderItem} />
    </div>
  )
}

export default BooksPage
