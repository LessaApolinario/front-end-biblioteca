import { ReactNode } from 'react'

interface TableProps<T> {
  className?: string
  data: T[]
  renderItem: (item: T, key: string) => ReactNode
  keyExtractor: (item: T) => string
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
        {props.data.map((data) => {
          const key = props.keyExtractor(data)
          return props.renderItem(data, key)
        })}
      </tbody>
    </table>
  )
}

export default Table
