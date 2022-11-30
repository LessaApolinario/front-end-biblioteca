import Button from './Button'

import styles from '../styles/components/BookComponent.module.scss'

import Book from '../../core/domain/models/Book'

interface BookComponentProps {
  props: Book
}

function BookComponent({ props }: BookComponentProps) {
  const formatAuthorName = (authorName: string | undefined) => {
    if (!authorName) {
      return '-'
    }

    const [lastName, firstName] = authorName.trim().split(',')

    return firstName ? `${firstName} ${lastName}` : lastName
  }

  return (
    <tr className={styles.container}>
      <td>{props.titulo}</td>
      <td>{formatAuthorName(props.autor)}</td>
      <td>{props.edicao}</td>
      <td>{props.ano ? props.ano = props.ano.replace('.', '') : '-'}</td>
      <td>
        <Button
          title='Informações sobre a localização dos livros'
          type='button'
          btnType="primary"
          onClick={
            () => console.log('redirecionando')
          }
        >
          {props.localizacao}
        </Button>
      </td>
    </tr>
  )
}

export default BookComponent
