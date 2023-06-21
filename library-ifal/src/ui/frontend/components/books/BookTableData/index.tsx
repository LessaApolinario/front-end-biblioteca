import Book from '../../../../../core/domain/models/Book';
import checkForInvalidString from '../../../../../core/utils/checkForInvalidString';
import { Button } from '../../base/Button';
import styles from './styles.module.scss';

interface Props {
  props?: Book;
}

function BookTableData({ props }: Props) {
  function formatAuthorName(authorName?: string) {
    const [lastName, firstName] = authorName?.trim()?.split(',') ?? [];
    return firstName ? `${firstName} ${lastName}` : lastName;
  }

  return (
    <tr className={styles.container}>
      <td>{checkForInvalidString(props?.titulo)}</td>
      <td>{formatAuthorName(checkForInvalidString(props?.autor))}</td>
      <td>{checkForInvalidString(props?.edicao)}</td>
      <td>{checkForInvalidString(props?.ano)}</td>
      <td>
        <Button type="button" color="black" onClick={() => console.log('')}>
          {checkForInvalidString(props?.localizacao)}
        </Button>
      </td>
    </tr>
  );
}

export { BookTableData };
