import { ReactNode } from 'react';

import styles from '../styles/components/Flex.module.scss';

interface FlexProps {
  className?: string;
  orientation: 'row' | 'column';
  children: ReactNode;
}

function Flex(props: FlexProps) {
  const className = `${styles.container} ${props.className} ${
    styles[props.orientation]
  }`;
  return <div className={className}>{props.children}</div>;
}

export default Flex;
