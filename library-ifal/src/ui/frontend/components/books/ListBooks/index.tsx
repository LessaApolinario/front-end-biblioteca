import { ReactNode } from 'react';
import Book from '../../../../../core/domain/models/Book';
import { useBooks } from '../../../../../hooks/useBooks';
import { Table } from '../../base/Table';
import { BookTableData } from '../BookTableData';
import styles from './styles.module.scss';

function ListBooks() {
  const { getBooks } = useBooks();
  const { books } = getBooks();

  function renderItem(item: Book): ReactNode {
    return <BookTableData props={item} key={item._id} />;
  }

  return (
    <Table<Book>
      className={styles.container}
      data={books}
      renderItem={renderItem}
      columns={['Título', 'Autor', 'Edição', 'Ano', 'Localização']}
    />
  );
}

export { ListBooks };