import styles from './styles.module.scss';

interface Props {
  size?: Sizes;
}

type Sizes = 'small' | 'medium' | 'large';

function Loading({ size }: Props) {
  const className = `${styles.container} ${styles[size || 'small']}`;
  return <div className={className}></div>;
}

export { Loading };
