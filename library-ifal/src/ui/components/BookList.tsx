import { ReactNode } from "react"

import styles from '../styles/components/BookList.module.scss'

interface BookListProps {
  children: ReactNode
}

function BookList({ children }: BookListProps) {
  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>Edição</th>
          <th>Ano</th>
          <th>Localização</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export default BookList
