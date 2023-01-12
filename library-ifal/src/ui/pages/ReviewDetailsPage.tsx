import { useLocation, useNavigate } from 'react-router-dom';

import Review from '../../core/domain/models/Review';

import Button from '../components/Button';
import Header from '../components/Header';

import styles from '../styles/pages/ReviewDetailsPage.module.scss';

function ReviewDetailsPage() {
  const navigate = useNavigate();
  const appLocation = useLocation();

  const previousRouteState = appLocation.state as Review;
  const { name, title_book, writer, review } = previousRouteState;

  return (
    <div className={styles.container}>
      <Header>
        <Button type="button" btnType="secondary" onClick={() => navigate(-1)}>
          Voltar
        </Button>

        <h2>Bem-vindo</h2>
      </Header>

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
