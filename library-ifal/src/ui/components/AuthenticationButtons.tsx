import { useNavigate } from 'react-router-dom';

import Button from './Button';

import styles from '../styles/components/AuthenticationButtons.module.scss';

interface AuthenticationButtonsProps {
  isAuthenticated: boolean;
  logout(): Promise<void>;
}

function AuthenticationButtons(props: AuthenticationButtonsProps) {
  const navigate = useNavigate();

  async function logout() {
    await props.logout();
    navigate(-1);
  }

  if (props.isAuthenticated) {
    return (
      <nav className={styles.container}>
        <Button type="button" btnType="secondary" onClick={logout}>
          Sair
        </Button>
      </nav>
    );
  }

  return (
    <nav className={styles.container}>
      <Button
        type="button"
        btnType="secondary"
        onClick={() => navigate('/login')}
      >
        Entrar
      </Button>
      <Button
        type="button"
        btnType="secondary"
        onClick={() => navigate('/register')}
      >
        Cadastrar-se
      </Button>
    </nav>
  );
}

export default AuthenticationButtons;
