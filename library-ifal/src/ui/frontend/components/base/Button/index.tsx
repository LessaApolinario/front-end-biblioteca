import { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

interface Props {
  color: ButtonColors;
  onClick?(): void;
  className?: string;
}

type ButtonColors = 'normal' | 'yellow' | 'black';

function Button({
  children,
  color,
  onClick,
  className,
}: PropsWithChildren<Props>) {
  const buttonClassName = `${styles.container} ${styles[color]} ${
    styles[className ?? '']
  }`;
  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
}

export { Button };
