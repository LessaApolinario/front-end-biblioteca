import AuthenticationButtons from '../components/AuthenticationButtons';
import ButtonsHeader from '../components/ButtonsHeader';
import Carousel from '../components/Carousel';
import PostsArea from '../components/PostsArea';

import { useAuth } from '../../hooks/useAuth';

import styles from '../styles/pages/HomePage.module.scss';

function HomePage() {
  const { isAuthenticated, logout } = useAuth();

  function RenderButtons() {
    return (
      <AuthenticationButtons
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
    );
  }

  return (
    <main className={styles.container}>
      <ButtonsHeader
        headerType={'primary'}
        renderButtons={() => <RenderButtons />}
      />

      <section className={styles.content}>
        <h1>Bem-vindo</h1>
        <Carousel />
        <PostsArea />
      </section>
    </main>
  );
}

export default HomePage;
