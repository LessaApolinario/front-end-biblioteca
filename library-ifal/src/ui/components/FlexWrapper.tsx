import { ReactNode } from 'react';

import styles from '../styles/components/FlexWrapper.module.scss';

interface FlexWrapperProps {
  className?: string;
  orientation: 'row' | 'column';
  children: ReactNode;
}

function FlexWrapper(props: FlexWrapperProps) {
  const className = `${styles.container} ${props.className} ${
    styles[props.orientation]
  }`;
  return <div className={className}>{props.children}</div>;
}

export default FlexWrapper;
