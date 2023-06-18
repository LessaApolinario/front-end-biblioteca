import { ReactNode } from 'react';

interface Props<T> {
  className?: string;
  columns: string[];
  data?: T[];
  renderItem: (item: T) => ReactNode;
  onClick?(): void;
}

function Table<T>({ className, columns, data, renderItem }: Props<T>) {
  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data?.map((item) => renderItem(item))}</tbody>
    </table>
  );
}

export { Table };
