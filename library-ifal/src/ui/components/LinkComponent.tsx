import { useNavigate } from 'react-router-dom';

import Text from './Text';

import styles from '../styles/components/LinkComponent.module.scss';

interface LinkComponentProps {
  text: string;
  to: string;
}

function LinkComponent(props: LinkComponentProps) {
  const navigate = useNavigate();
  const words = props.text.split(' ');
  const lastText = words.pop();
  const title = words.join(' ');

  return (
    <div className={styles.container}>
      <Text className={'primary'} text={title} />
      <span onClick={() => navigate(props.to)}>{lastText}</span>
    </div>
  );
}

export default LinkComponent;
