import { ReactNode } from "react"

interface TableProps<T> {
  className: string
  data: T[]
  renderItem: (item: T, key: number) => ReactNode
  thead: string[]
  onClick?(): void
}

function Table<T>(props: TableProps<T>) {
  function Thead() {
    const thead = <thead>
      <tr>
        {props.thead.map((cell, index) => {
          return <th key={index}>{cell}</th>
        })}
      </tr>
    </thead>

    return thead
  }

  function Tbody() {
    const tbody = <tbody>
      {props.data.map((data, index) => {
        return props.renderItem(data, index)
      })}
    </tbody>

    return tbody
  }

  return (
    <table className={props.className}>
      <Thead />
      <Tbody />
    </table>
  )
}

export default Table
