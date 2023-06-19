import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import { Button } from '../base/Button';
import styles from './styles.module.scss';

function AuthenticationButtons() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  let children = <></>;

  if (isAuthenticated) {
    children = (
      <Button color="yellow" onClick={logout}>
        Sair
      </Button>
    );
  } else {
    children = (
      <>
        <Button color="yellow" onClick={() => navigate('/login')}>
          Entrar
        </Button>
        <Button color="yellow" onClick={() => navigate('/register')}>
          Cadastrar-se
        </Button>
      </>
    );
  }

  return <nav className={styles.container}>{children}</nav>;
}

export { AuthenticationButtons };
