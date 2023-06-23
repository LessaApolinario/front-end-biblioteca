import { ReactNode, RefObject } from 'react';

import Form from './Form';
import Input from './Input';

import styles from '../styles/components/SearchForm.module.scss';

interface SearchFormProps {
  placeholder: string;
  searchRef: RefObject<HTMLInputElement>;
  handleSubmit(): void | Promise<void>;
  renderButtons(): ReactNode;
  className?: string;
}

function SearchForm(props: SearchFormProps) {
  const searchFormClassName = `${styles.container} ${props.className ?? ''}`;

  return (
    <section className={searchFormClassName}>
      <Form
        className={styles.searchForm}
        orientation={'row'}
        handleSubmit={props.handleSubmit}
      >
        <Input
          type={'search'}
          name={'pesquisa'}
          placeholder={props.placeholder}
          ref={props.searchRef}
        />
        <div className={styles.buttons}>{props.renderButtons()}</div>
      </Form>
    </section>
  );
}

export default SearchForm;
