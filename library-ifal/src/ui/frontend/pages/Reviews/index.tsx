import { Suspense } from 'react';
import { MainHeader } from '../../components/MainHeader';
import { Loading } from '../../components/base/Loading';
import { AddReview } from '../../components/reviews/AddReview';
import { ListReviews } from '../../components/reviews/ListReviews';
import styles from './styles.module.scss';
import { ChatCircleDots } from '@phosphor-icons/react';
import { SearchReviews } from '../../components/reviews/SearchReviews';

export default function Reviews() {
  return (
    <div className={styles.container}>
      <MainHeader />

      <div className={styles.welcome}>
        <h2>
          Bem-vindo à página de resenhas. <ChatCircleDots size={40} />
        </h2>
      </div>

      <main>
        <AddReview />

        <SearchReviews />

        <Suspense fallback={<Loading size="large" />}>
          <ListReviews />
        </Suspense>
      </main>
    </div>
  );
}
