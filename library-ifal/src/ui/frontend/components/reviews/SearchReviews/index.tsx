import { createRef } from 'react';

import { useReviews } from '../../../../../hooks/useReviews';
import Form from '../../../../components/Form';
import { Button } from '../../base/Button';
import FormField, { FormFieldHandlers } from '../../base/FormField';

import styles from './styles.module.scss';

function SearchReviews() {
  const { search } = useReviews();
  const searchRef = createRef<FormFieldHandlers>();

  function handleSearchReviews() {
    const query = searchRef.current?.getValue() ?? '';
    search(query);
  }

  return (
    <Form
      className={styles.container}
      orientation="row"
      handleSubmit={handleSearchReviews}
    >
      <FormField
        type="search"
        name="pesquisa"
        placeholder="Buscar resenhas"
        ref={searchRef}
      />

      <Button type="submit" color="black">
        Pesquisar
      </Button>
    </Form>
  );
}

export { SearchReviews };
