import { useRef } from 'react';
import Form from '../../../components/Form';
import { Button } from '../base/Button';
import FormField, { FormFieldHandlers } from '../base/FormField';
import styles from './styles.module.scss';

interface Props {
  search: (query: string) => void;
  className?: string;
}

function SearchForm({ search, className }: Props) {
  const searchFormClassName = `${styles.container} ${className ?? ''}`;
  const searchRef = useRef<FormFieldHandlers>(null);

  function handleSubmit() {
    const query = searchRef.current?.getValue() ?? '';
    search(query);
  }

  return (
    <Form
      className={searchFormClassName}
      handleSubmit={handleSubmit}
      orientation="column"
    >
      <FormField
        type="search"
        placeholder="O que você está procurando"
        name="pesquisa"
        ref={searchRef}
      />
      <Button type="submit" color="black">
        Pesquisar
      </Button>
    </Form>
  );
}

export { SearchForm };
