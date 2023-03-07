import { ReactNode, RefObject } from 'react';

import Form from './Form';
import Input from './Input';

import styles from '../styles/components/SearchArea.module.scss';

interface SearchFormProps {
  placeholder: string;
  searchRef: RefObject<HTMLInputElement>;
  handleSubmit(): void | Promise<void>;
  renderButtons(): ReactNode;
}

function SearchForm(props: SearchFormProps) {
  return (
    <Form
      className={styles.container}
      orientation={'row'}
      handleSubmit={props.handleSubmit}
    >
      <section className={styles.searchArea}>
        <Input
          type={'text'}
          name={'pesquisa'}
          placeholder={props.placeholder}
          ref={props.searchRef}
        />
        <section className={styles.buttons}>{props.renderButtons()}</section>
      </section>
    </Form>
  );
}

export default SearchForm;
