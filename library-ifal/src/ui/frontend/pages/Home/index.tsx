import PostsArea from '../../../components/PostsArea';
import { Carousel } from './Carousel';
import { MainHeader } from './MainHeader';
import styles from './styles.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <MainHeader />
      <main className={styles.grid}>
        <h1>Bem-vindo</h1>
        <Carousel />
        <PostsArea />
      </main>
    </div>
  );
}
