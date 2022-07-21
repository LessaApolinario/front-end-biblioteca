import Book from "../components/Book";
import BookFinder from "../components/BookFinder";
import BookList from "../components/BookList";

import styles from '../styles/pages/HomePage.module.scss'

function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Livros</h1>

      <BookFinder />
      <BookList>
        <Book
          title='1984'
          author='Orwell,
          George'
          year='2009'
          localization='823
          O79m
          ex.1'
        />
        <Book
          title='1984'
          year='2009'
          localization='823
          O79m
          ex.2'
        />
      </BookList>
    </div>
  )
}

export default HomePage
