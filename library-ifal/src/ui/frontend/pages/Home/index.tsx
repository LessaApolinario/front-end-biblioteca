import { Carousel } from '../../components/home/Carousel';
import { MainHeader } from '../../components/MainHeader';
import { PostsSection } from '../../components/home/PostsSection';
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
