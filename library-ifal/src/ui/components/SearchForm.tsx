import { ReactNode, RefObject } from 'react';

import Form from './Form';
import Input from './Input';

import styles from '../styles/components/SearchForm.module.scss';

interface SearchFormProps {
  placeholder: string;
  searchRef: RefObject<HTMLInputElement>;
  handleSubmit(): void | Promise<void>;
  renderButtons(): ReactNode;
}

function SearchForm(props: SearchFormProps) {
  return (
    <section className={styles.container}>
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
