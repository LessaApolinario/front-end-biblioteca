import { ReactNode } from 'react';

import styles from '../styles/components/Header.module.scss';

interface HeaderProps {
  children: ReactNode;
}

function Header(props: HeaderProps) {
  return <header className={styles.container}>{props.children}</header>;
}

export default Header;
