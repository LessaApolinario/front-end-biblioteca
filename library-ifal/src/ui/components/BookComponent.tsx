import Book from '../../core/domain/models/Book';

import Button from './Button';

import checkForInvalidString from '../../core/utils/checkForInvalidString';

import styles from '../styles/components/BookComponent.module.scss';

interface BookComponentProps {
  props: Book;
}

function BookComponent({ props }: BookComponentProps) {
  function formatAuthorName(authorName?: string) {
    const [lastName, firstName] = authorName?.trim()?.split(',') ?? [];
    return firstName ? `${firstName} ${lastName}` : lastName;
  }

  return (
    <tr className={styles.container}>
      <td>{checkForInvalidString(props.titulo)}</td>
      <td>{formatAuthorName(checkForInvalidString(props.autor))}</td>
      <td>{checkForInvalidString(props.edicao)}</td>
      <td>{checkForInvalidString(props.ano)}</td>
      <td>
        <Button
          title="Informações sobre a localização dos livros"
          type="button"
          btnType="primary"
          onClick={() => console.log('redirecionando')}
        >
          {checkForInvalidString(props.localizacao)}
        </Button>
      </td>
    </tr>
  );
}

export default BookComponent;
