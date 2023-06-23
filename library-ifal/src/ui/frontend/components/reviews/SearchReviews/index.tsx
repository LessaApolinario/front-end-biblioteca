import { createRef } from 'react';
import getFieldFromRef from '../../../../../core/utils/getFieldFromRef';
import { useReviews } from '../../../../../hooks/useReviews';
import SearchForm from '../../../../components/SearchForm';
import { Button } from '../../base/Button';

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
      placeholder="Buscar resenhas"
      searchRef={searchRef}
      handleSubmit={handleSearchReviews}
      renderButtons={renderButtons}
    />
  );
}

export { SearchReviews };
