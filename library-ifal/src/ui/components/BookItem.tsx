import Button from "./Button"

import styles from '../styles/components/Book.module.scss'

interface BookItemProps {
  title?: string
  author?: string
  edition?: string
  year?: string
  localization?: string
}

function BookItem({ title, author, edition, year, localization }: BookItemProps) {
  const formatAuthorName = (authorName: string | undefined) => {
    if (!authorName) {
      return '-'
    }

    const [lastName, firstName] = authorName.trim().split(',')

    return firstName ? `${firstName} ${lastName}` : lastName
  }

  return (
    <tr className={styles.container}>
      <td>{title}</td>
      <td>{formatAuthorName(author)}</td>
      <td>{edition}</td>
      <td>{year ? year = year.replace('.', '') : '-'}</td>
      <td>
        <Button
          title='Informações sobre a localização dos livros'
          type='button'
          btnType="primary"
          onClick={
            () => console.log('redirecionando')
          }
        >
          {localization}
        </Button>
      </td>
    </tr>
  )
}

export default BookItem
