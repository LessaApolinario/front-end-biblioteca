import { GoBackHeader } from '../../components/books/GoBackHeader';
import { ListBooks } from '../../components/books/ListBooks';
import { SearchBooks } from '../../components/books/SearchBooks';
import styles from './styles.module.scss';

export default function Books() {
  return (
    <div className={styles.container}>
      <GoBackHeader />
      <SearchBooks />
      <ListBooks />
    </div>
  );
}
