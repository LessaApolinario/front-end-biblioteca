import { ReactNode, useRef } from 'react';

import { useForm } from '../../hooks/useForm';

import styles from '../styles/components/Form.module.scss';

interface FormProps {
  className?: string;
  orientation: 'row' | 'column';
  children: ReactNode;
  handleSubmit(): Promise<void> | void;
}

function Form(props: FormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const { validateForm } = useForm(ref);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = validateForm();
    if (exists(error)) {
      return;
    }
    await props.handleSubmit();
  }

  function exists(error?: string) {
    return !!error;
  }

  const className = `${styles.container} ${props.className} ${
    styles[props.orientation]
  }`;

  return (
    <form ref={ref} className={className} onSubmit={onSubmit}>
      {props.children}
    </form>
  );
}

export default Form;
