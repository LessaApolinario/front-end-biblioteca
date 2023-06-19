import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

function NavigationLinksList() {
  const navigate = useNavigate();

  const redirectToHomePage = () => navigate('/');

  const redirectToBooksPage = () => navigate('/books');

  const redirectToReviewsPage = () => navigate('/reviews');

  const redirectToHintsPage = () => navigate('/hints');

  const redirectToContactPage = () => navigate('/contact');

  return (
    <nav className={styles.container}>
      <ul>
        <li onClick={redirectToHomePage}>Home</li>
        <li onClick={redirectToBooksPage}>Livros</li>
        <li onClick={redirectToReviewsPage}>Resenhas</li>
        <li onClick={redirectToHintsPage}>Dicas</li>
        <li onClick={redirectToContactPage}>Contato</li>
      </ul>
    </nav>
  );
}

export { NavigationLinksList };
