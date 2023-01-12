import { ForwardedRef, forwardRef, ReactNode } from 'react';

import styles from '../styles/components/Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  btnType: 'primary' | 'secondary';
  onClick?(): void;
}

function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const className = `${styles.container} ${styles[props.btnType]}`;

  return (
    <button
      title={props.title}
      className={className}
      type={props.type}
      onClick={props.onClick}
      ref={ref}
    >
      {props.children}
    </button>
  );
}

export default forwardRef(Button);
