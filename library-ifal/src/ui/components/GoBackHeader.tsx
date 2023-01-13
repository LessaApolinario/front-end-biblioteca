import { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from './Button';

import styles from '../styles/components/GoBackHeader.module.scss';

interface GoBackHeaderProps {
  headerType: 'primary' | 'secondary';
  btnType: 'primary' | 'secondary';
  headingText: string;
  renderList(): ReactNode;
}

function GoBackHeader(props: GoBackHeaderProps) {
  const navigate = useNavigate();
  const className = `${styles.container} ${styles[props.headerType]}`;

  function goBack() {
    navigate(-1);
  }

  return (
    <header className={className}>
      <nav className={styles.navbar}>
        <Button type={'button'} btnType={props.btnType} onClick={goBack}>
          Voltar
        </Button>

        {props.renderList()}

        <h2>{props.headingText}</h2>
      </nav>
    </header>
  );
}

export default GoBackHeader;
