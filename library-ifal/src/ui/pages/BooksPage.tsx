import { ReactNode, createRef } from 'react';

import { useBooks } from '../../hooks/useBooks';

import BookComponent from '../components/BookComponent';
import Button from '../components/Button';
import GoBackHeader from '../components/GoBackHeader';
import SearchForm from '../components/SearchForm';
import Table from '../components/Table';

import Book from '../../core/domain/models/Book';

import styles from '../styles/pages/BooksPage.module.scss';

function BooksPage() {
  const { fetchBooks, searchBooks, getBooks } = useBooks();
  const { books } = getBooks();
  const searchRef = createRef<HTMLInputElement>();

  function handleSearchBooks() {
    const query = searchRef?.current?.value ?? '';
    searchBooks(query);
  }

  function renderItem(item: Book): ReactNode {
    return <BookComponent props={item} key={String(item._id)} />;
  }

  function renderButtons() {
    return (
      <>
        <Button type="submit" btnType="primary">
          Pesquisar livros
        </Button>
        <Button type="button" btnType="primary" onClick={fetchBooks}>
          Listar livros
        </Button>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <GoBackHeader
        headerType={'primary'}
        btnType={'primary'}
        headingText={'SIB'}
      />

      <SearchForm
        placeholder={'Buscar livros'}
        searchRef={searchRef}
        handleSubmit={handleSearchBooks}
        renderButtons={renderButtons}
      />

      <Table<Book>
        className={styles.table}
        data={books}
        renderItem={renderItem}
        columns={['Título', 'Autor', 'Edição', 'Ano', 'Localização']}
      />
    </div>
  );
}

export default BooksPage;
