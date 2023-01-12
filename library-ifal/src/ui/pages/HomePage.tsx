import { useNavigate } from 'react-router-dom';

import { GiTreeBranch } from 'react-icons/gi';

import Button from '../components/Button';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
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
      <Header>
        <GiTreeBranch />
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/books')}>Livros</li>
          <li onClick={() => navigate('/reviews')}>Resenhas</li>
          <li onClick={() => navigate('/hints')}>Dicas</li>
          <li onClick={() => navigate('/contact')}>Contato</li>
        </ul>

        <div className={styles.buttons}>{renderButtons()}</div>
      </Header>

      <section className={styles.content}>
        <h1>Bem-vindo</h1>
        <Carousel />
        <PostsArea />
      </section>
    </main>
  );
}

export default HomePage;
