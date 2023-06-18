import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface Props {
  children?: ReactNode;
  body?: HeaderBody;
  className?: string;
}

interface HeaderBody {
  logo: ReactNode;
  links: ReactNode;
  buttons: ReactNode;
}

function Header({ children, body, className }: Props) {
  if (!!children) {
    return <header className={className}>{children}</header>;
  }

  return (
    <header className={styles.container}>
      {body?.logo} {body?.links} {body?.buttons}
    </header>
  );
}

export { Header };
