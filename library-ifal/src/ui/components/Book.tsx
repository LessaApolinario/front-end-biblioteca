import Button from "./Button"

import styles from '../styles/components/Book.module.scss'

interface BookProps {
  title: string
  author?: string
  edition?: string
  year: string
  localization: string
}

function Book({ title, author, edition, year, localization }: BookProps) {
  const formatAuthorName = (authorName: string) => {
    const [lastName, firstName] = authorName?.trim().split(',')
    
    return firstName ? `${firstName} ${lastName}` : lastName
  }
  
  const formattedAuthor = author ? formatAuthorName(author) : ''

  if (!edition) {
    edition = ''
  }

  if (year) {
    year = year.replace('.', '')
  }

  return (
    <tr className={styles.container}>
      <td>{title}</td>
      <td>{formattedAuthor}</td>
      <td>{edition}</td>
      <td>{year}</td>
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

export default Book
