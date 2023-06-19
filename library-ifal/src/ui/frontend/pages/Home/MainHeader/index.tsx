import { AuthenticationButtons } from '../../../components/AuthenticationButtons';
import { Header } from '../../../components/base/Header';
import { Leaf } from '@phosphor-icons/react';
import styles from '../styles.module.scss';
import { NavigationLinksList } from '../../../components/NavigationLinksList';

function MainHeader() {
  return (
    <Header
      body={{
        logo: <Leaf size={32} className={styles.icon} />,
        links: <NavigationLinksList />,
        buttons: <AuthenticationButtons />,
      }}
    />
  );
}

export { MainHeader };
