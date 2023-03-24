import { useRouter } from '../../hooks/useRouter';

import Button from './Button';

import styles from '../styles/components/GoBackHeader.module.scss';

interface GoBackHeaderProps {
  headerType: 'primary' | 'secondary';
  btnType: 'primary' | 'secondary';
  headingText: string;
}

function GoBackHeader(props: GoBackHeaderProps) {
  const { redirectToPreviousPage } = useRouter();
  const className = `${styles.container} ${styles[props.headerType]}`;

  return (
    <header className={className}>
      <nav className={styles.navbar}>
        <Button
          type={'button'}
          btnType={props.btnType}
          onClick={redirectToPreviousPage}
        >
          Voltar
        </Button>

        <h2>{props.headingText}</h2>
      </nav>
    </header>
  );
}

export default GoBackHeader;
