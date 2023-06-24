import { useBooks } from '../../../../hooks/useBooks';
import { SearchForm } from '../../components/SearchForm';
import { GoBackHeader } from '../../components/books/GoBackHeader';
import { ListBooks } from '../../components/books/ListBooks';
import styles from './styles.module.scss';

export default function Books() {
  const { search } = useBooks();

  return (
    <div className={styles.container}>
      <GoBackHeader />
      <div className={styles.searchForm}>
        <SearchForm search={search} />
      </div>
      <ListBooks />
    </div>
  );
}
