import { createRef } from 'react';
import getFieldFromRef from '../../../../../core/utils/getFieldFromRef';
import { useReviews } from '../../../../../hooks/useReviews';
import SearchForm from '../../../../components/SearchForm';
import { Button } from '../../base/Button';
import styles from './styles.module.scss';

function SearchReviews() {
  const { search } = useReviews();
  const searchRef = createRef<HTMLInputElement>();

  function handleSearchReviews() {
    const { field: query } = getFieldFromRef(searchRef);
    search(query);
  }

  function renderButtons() {
    return (
      <Button type="submit" color="black">
        Pesquisar
      </Button>
    );
  }

  return (
    <SearchForm
      className={styles.container}
      placeholder="Buscar resenhas"
      searchRef={searchRef}
      handleSubmit={handleSearchReviews}
      renderButtons={renderButtons}
    />
  );
}

export { SearchReviews };
