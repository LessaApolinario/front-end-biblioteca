import { useRouter } from '../../hooks/useRouter';

import Button from './Button';

import styles from '../styles/components/AuthenticationButtons.module.scss';

interface AuthenticationButtonsProps {
  isAuthenticated: boolean;
  logout(): Promise<void>;
}

function AuthenticationButtons(props: AuthenticationButtonsProps) {
  const { goto, redirectToPreviousPage } = useRouter();

  async function logout() {
    await props.logout();
    redirectToPreviousPage();
  }

  const redirectToLoginPage = () => goto('/login');

  const redirectToRegisterPage = () => goto('/register');

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
      <Button type="button" btnType="secondary" onClick={redirectToLoginPage}>
        Entrar
      </Button>
      <Button
        type="button"
        btnType="secondary"
        onClick={redirectToRegisterPage}
      >
        Cadastrar-se
      </Button>
    </nav>
  );
}

export default AuthenticationButtons;
