import { useLocation } from 'react-router-dom';

import GoBackHeader from '../components/GoBackHeader';

import Review from '../../core/domain/models/Review';

import styles from '../styles/pages/ReviewDetailsPage.module.scss';

function ReviewDetailsPage() {
  const appLocation = useLocation();

  const previousRouteState = appLocation.state as Review;
  const { name, title_book, writer, review } = previousRouteState;

  return (
    <div className={styles.container}>
      <GoBackHeader
        headerType={'secondary'}
        btnType={'secondary'}
        headingText={'Bem-vindo'}
      />

      <section className={styles.content}>
        <h3>Uma resenha de {name}</h3>
        <p>
          {title_book} de {writer}
        </p>
        <p>{review}</p>
      </section>
    </div>
  );
}

export default ReviewDetailsPage;
