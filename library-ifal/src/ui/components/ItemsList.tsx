import { ReactNode } from 'react';

import FlexWrapper from './FlexWrapper';

import styles from '../styles/components/ItemsList.module.scss';

interface ItemsListProps<T> {
  data: T[] | undefined;
  orientation: 'column' | 'row';
  renderItem(item: T): ReactNode;
}

function ItemsList<T>(props: ItemsListProps<T>) {
  return (
    <FlexWrapper className={styles.container} orientation={props.orientation}>
      {props.data?.map((item) => props.renderItem(item))}
    </FlexWrapper>
  );
}

export default ItemsList;
