import { ReactNode } from 'react'

interface TableProps<T> {
  className?: string
  data: T[]
  renderItem: (item: T, key: number) => ReactNode
  columns: string[]
  onClick?(): void
}

function Table<T>(props: TableProps<T>) {
  return (
    <table className={props.className}>
      <thead>
        <tr>
          {props.columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((data, index) => (props.renderItem(data, index)))}
      </tbody>
    </table>
  )
}

export default Table
