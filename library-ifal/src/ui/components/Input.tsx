import { ForwardedRef, forwardRef, HTMLInputTypeAttribute } from 'react';

import styles from '../styles/components/Input.module.scss';

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  name: string;
}

function Input(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <input
      type={props.type}
      className={styles.container}
      placeholder={props.placeholder}
      name={props.name}
      ref={ref}
    />
  );
}

export default forwardRef(Input);
