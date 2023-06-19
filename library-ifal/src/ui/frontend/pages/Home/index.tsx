import { Carousel } from './Carousel';
import { MainHeader } from './MainHeader';
import { PostsSection } from './PostsSection';
import styles from './styles.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <MainHeader />
      <main className={styles.grid}>
        <h1>Bem-vindo</h1>
        <Carousel />
        <PostsSection />
      </main>
    </div>
  );
}
