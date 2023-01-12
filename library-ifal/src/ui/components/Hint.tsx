import { ReactNode } from 'react';

import styles from '../styles/components/Hint.module.scss';

interface HintProps {
  title: string;
  children: ReactNode;
}

function Hint(props: HintProps) {
  return (
    <section className={styles.container}>
      <h2>{props.title}</h2>
      {props.children}
    </section>
  );
}

export default Hint;
