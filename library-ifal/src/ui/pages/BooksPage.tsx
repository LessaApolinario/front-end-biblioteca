import { ReactNode, createRef } from 'react';

import { useBooks } from '../../hooks/useBooks';

import BookComponent from '../components/BookComponent';
import Button from '../components/Button';
import Form from '../components/Form';
import GoBackHeader from '../components/GoBackHeader';
import Input from '../components/Input';
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

  function RenderBooksForm() {
    return (
      <Form
        className={styles.form}
        orientation={'row'}
        handleSubmit={handleSearchBooks}
      >
        <div className={styles.search}>
          <Input
            type={'text'}
            placeholder={'Buscar ou listar livros'}
            name={'pesquisa de livros'}
            ref={searchRef}
          />

          <div className={styles.buttons}>
            <Button type="submit" btnType="primary">
              Pesquisar livros
            </Button>
            <Button type="button" btnType="primary" onClick={fetchBooks}>
              Listar livros
            </Button>
          </div>
        </div>
      </Form>
    );
  }

  return (
    <div className={styles.container}>
      <GoBackHeader
        headerType={'primary'}
        btnType={'primary'}
        headingText={'SIB'}
      />

      <RenderBooksForm />

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
