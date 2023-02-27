import Button from './Button';

import styles from '../styles/components/BookComponent.module.scss';

import Book from '../../core/domain/models/Book';
import checkInvalidAPIField from '../../core/utils/checkInvalidAPIField';

interface BookComponentProps {
  props: Book;
}

function BookComponent({ props }: BookComponentProps) {
  function formatAuthorName(authorName?: string) {
    if (!authorName) {
      return '-';
    }

    const [lastName, firstName] = authorName?.trim()?.split(',') ?? [];
    return firstName ? `${firstName} ${lastName}` : lastName;
  }

  return (
    <tr className={styles.container}>
      <td>{checkInvalidAPIField(props.titulo)}</td>
      <td>{checkInvalidAPIField(formatAuthorName(props.autor))}</td>
      <td>{checkInvalidAPIField(props.edicao)}</td>
      <td>{checkInvalidAPIField(props.ano)}</td>
      <td>
        <Button
          title="Informações sobre a localização dos livros"
          type="button"
          btnType="primary"
          onClick={() => console.log('redirecionando')}
        >
          {checkInvalidAPIField(props.localizacao)}
        </Button>
      </td>
    </tr>
  );
}

export default BookComponent;
