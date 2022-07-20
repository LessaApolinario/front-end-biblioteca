import styles from '../styles/components/BookFinder.module.scss'
import Button from './Button'

interface BookFinderProps {

}

function BookFinder() {
  return (
    <form className={styles.container}>
      <div className={styles.search}>
        <input
          type='text'
          placeholder='Buscar ou listar livros'
          name='search'
        />

        <div className={styles.buttons}>
          <Button type='submit' onClick={() => console.log('handleSearchBook')}>Pesquisar livros</Button>
          <Button type='submit' onClick={() => console.log('listAll')}>Listar livros</Button>
        </div>
      </div>
    </form>
  )
}

export default BookFinder
