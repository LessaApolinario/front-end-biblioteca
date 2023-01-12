import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';

import styles from '../styles/pages/Error404Page.module.scss';

function Error404Page() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <section className={styles.container}>
      <h2>Page Not Found</h2>

      <Button btnType="primary" onClick={redirectToHome}>
        Voltar para a página inicial
      </Button>
    </section>
  );
}

export default Error404Page;
