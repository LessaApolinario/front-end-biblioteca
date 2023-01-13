import { ReactNode } from 'react';

import { GiTreeBranch } from 'react-icons/gi';

import NavigationLinksList from './NavigationLinksList';

import styles from '../styles/components/ButtonsHeader.module.scss';

interface ButtonsHeaderProps {
  headerType: 'primary' | 'secondary';
  renderButtons(): ReactNode;
}

function ButtonsHeader(props: ButtonsHeaderProps) {
  const className = `${styles.container} ${styles[props.headerType]}`;

  return (
    <header className={className}>
      <GiTreeBranch />
      <NavigationLinksList type={props.headerType} />
      <div className={styles.buttons}>{props.renderButtons()}</div>
    </header>
  );
}

export default ButtonsHeader;
