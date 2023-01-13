import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import ButtonsHeader from '../components/ButtonsHeader';
import Carousel from '../components/Carousel';
import PostsArea from '../components/PostsArea';

import { useAuth } from '../../hooks/useAuth';

import styles from '../styles/pages/HomePage.module.scss';

function HomePage() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const renderButtons = () => {
    if (!isAuthenticated) {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <Button
          type="button"
          btnType="secondary"
          onClick={() => {
            logout();
          }}
        >
          Sair
        </Button>
      );
    }
  };

  return (
    <main className={styles.container}>
      <ButtonsHeader headerType={'primary'} renderButtons={renderButtons} />

      <section className={styles.content}>
        <h1>Bem-vindo</h1>
        <Carousel />
        <PostsArea />
      </section>
    </main>
  );
}

export default HomePage;
