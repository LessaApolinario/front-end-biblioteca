import { createRef } from 'react';
import getFieldFromRef from '../../../../../core/utils/getFieldFromRef';
import { useBooks } from '../../../../../hooks/useBooks';
import SearchForm from '../../../../components/SearchForm';
import { Button } from '../../../components/base/Button';

function SearchBooks() {
  const { search, fetch } = useBooks();
  const searchRef = createRef<HTMLInputElement>();

  function handleSearchBooks() {
    const { field: query } = getFieldFromRef(searchRef);
    search(query);
  }

  function renderButtons() {
    return (
      <>
        <Button type="submit" color="black">
          Pesquisar livros
        </Button>
        <Button type="button" color="black" onClick={fetch}>
          Listar livros
        </Button>
      </>
    );
  }

  return (
    <SearchForm
      placeholder={'Buscar livros'}
      searchRef={searchRef}
      handleSubmit={handleSearchBooks}
      renderButtons={renderButtons}
    />
  );
}

export { SearchBooks };
