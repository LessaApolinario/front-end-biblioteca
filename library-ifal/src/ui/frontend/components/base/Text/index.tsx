import { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

interface Props {
  size: TextSizes;
  className?: string;
}

type TextSizes = 'small' | 'medium' | 'large';

function Text({ children, size, className }: PropsWithChildren<Props>) {
  const textClassName = `${styles.container} ${styles[size]} ${
    className ?? ''
  }`;
  return <p className={textClassName}>{children}</p>;
}

export { Text };
