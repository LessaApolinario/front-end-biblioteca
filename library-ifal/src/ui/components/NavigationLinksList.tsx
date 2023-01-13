import { useNavigate } from 'react-router-dom';

import styles from '../styles/components/NavigationLinksList.module.scss';

interface NavigationLinksListProps {
  type: 'primary' | 'secondary';
}

function NavigationLinksList(props: NavigationLinksListProps) {
  const navigate = useNavigate();
  const className = `${styles.container} ${styles[props.type]}`;

  return (
    <nav className={className}>
      <ul>
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/books')}>Livros</li>
        <li onClick={() => navigate('/reviews')}>Resenhas</li>
        <li onClick={() => navigate('/hints')}>Dicas</li>
        <li onClick={() => navigate('/contact')}>Contato</li>
      </ul>
    </nav>
  );
}

export default NavigationLinksList;
