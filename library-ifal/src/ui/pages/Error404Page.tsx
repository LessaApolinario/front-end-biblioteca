import { useRouter } from '../../hooks/useRouter';

import Button from '../components/Button';

import styles from '../styles/pages/Error404Page.module.scss';

function Error404Page() {
  const { goto } = useRouter();

  const redirectToHomePage = () => goto('/');

  return (
    <section className={styles.container}>
      <h2>Page Not Found</h2>

      <Button btnType="primary" onClick={redirectToHomePage}>
        Voltar para a página inicial
      </Button>
    </section>
  );
}

export default Error404Page;
