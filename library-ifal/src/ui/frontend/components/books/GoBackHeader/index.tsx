import { useNavigate } from 'react-router-dom';
import { Button } from '../../base/Button';
import { Header } from '../../base/Header';
import styles from './styles.module.scss';

export function GoBackHeader() {
  const navigate = useNavigate();

  function redirectToPreviousPage() {
    navigate(-1);
  }

  return (
    <Header className={styles.container}>
      <nav>
        <Button type="button" color="black" onClick={redirectToPreviousPage}>
          Voltar
        </Button>

        <h2>SIB</h2>
      </nav>
    </Header>
  );
}
