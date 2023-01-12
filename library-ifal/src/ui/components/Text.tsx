import styles from '../styles/components/Text.module.scss';

interface TextProps {
  text: string;
  className: string;
}

function Text(props: TextProps) {
  const className = `${styles.container} ${styles[props.className]}`;
  return <p className={className}>{props.text}</p>;
}

export default Text;
