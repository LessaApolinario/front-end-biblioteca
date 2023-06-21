import { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

interface Props {
  type: ButtonTypes;
  color: ButtonColors;
  onClick?(): void;
  className?: string;
}

type ButtonTypes = 'button' | 'submit' | 'reset';
type ButtonColors = 'normal' | 'yellow' | 'black';

function Button({
  children,
  type,
  color,
  onClick,
  className,
}: PropsWithChildren<Props>) {
  const buttonClassName = `${styles.container} ${styles[color]} ${
    styles[className ?? '']
  }`;
  return (
    <button type={type} className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
}

export { Button };
