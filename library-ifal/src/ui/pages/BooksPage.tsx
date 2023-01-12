import { ReactNode, createRef, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import BookComponent from '../components/BookComponent';
import Button from '../components/Button';
import Header from '../components/Header';
import Table from '../components/Table';

import styles from '../styles/pages/BooksPage.module.scss';
import Input from '../components/Input';

import { useBooks } from '../../hooks/useBooks';
import { useFields } from '../../hooks/useFields';

import Book from '../../core/domain/models/Book';

function BooksPage() {
  const { validateInput } = useFields();
  const { books, listBooks, searchBooks } = useBooks();
  const inputRef = createRef<HTMLInputElement>();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const columns = ['Título', 'Autor', 'Edição', 'Ano', 'Localização'];

  const renderItem = (item: Book): ReactNode => {
    return <BookComponent props={item} key={String(item._id)} />;
  };

  const handleListBooks = useCallback(async () => {
    await listBooks();
  }, []);

  const handleSearchBook = useCallback(async () => {
    const searchInput = inputRef.current;
    const query = searchInput?.value ?? '';
    validateInput(searchInput);
    await searchBooks(query);
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div className={styles.container}>
      <Header>
        <nav className={styles.navbar}>
          <Button
            type="button"
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
          <Input
            type={'text'}
            placeholder={'Buscar ou listar livros'}
            name={'pesquisa de livros'}
            ref={inputRef}
          />

          <div className={styles.buttons}>
            <Button type="submit" btnType="primary" onClick={handleSearchBook}>
              Pesquisar livros
            </Button>
            <Button type="submit" btnType="primary" onClick={handleListBooks}>
              Listar livros
            </Button>
          </div>
        </div>
      </form>

      <Table<Book>
        className={styles.table}
        data={books}
        renderItem={renderItem}
        columns={columns}
      />
    </div>
  );
}

export default BooksPage;
