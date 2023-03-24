import { useRouter } from '../../hooks/useRouter';

import styles from '../styles/components/NavigationLinksList.module.scss';

interface NavigationLinksListProps {
  type: 'primary' | 'secondary';
}

function NavigationLinksList(props: NavigationLinksListProps) {
  const { goto } = useRouter();
  const className = `${styles.container} ${styles[props.type]}`;

  const redirectToHomePage = () => goto('/');

  const redirectToBooksPage = () => goto('/books');

  const redirectToReviewsPage = () => goto('/reviews');

  const redirectToHintsPage = () => goto('/hints');

  const redirectToContactPage = () => goto('/contact');

  return (
    <nav className={className}>
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

export default NavigationLinksList;
