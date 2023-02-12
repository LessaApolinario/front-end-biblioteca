import { ReactNode } from 'react';

import Flex from './Flex';

import styles from '../styles/components/ItemsList.module.scss';

interface ItemsListProps<T> {
  data: T[] | undefined;
  orientation: 'column' | 'row';
  renderItem(item: T): ReactNode;
}

function ItemsList<T>(props: ItemsListProps<T>) {
  return (
    <Flex className={styles.container} orientation={props.orientation}>
      {props.data?.map((item) => props.renderItem(item))}
    </Flex>
  );
}

export default ItemsList;
