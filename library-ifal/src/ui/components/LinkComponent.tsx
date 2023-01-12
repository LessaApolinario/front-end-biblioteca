import { useNavigate } from 'react-router-dom';

import Text from './Text';
import FlexWrapper from './FlexWrapper';

import styles from '../styles/components/LinkComponent.module.scss';

interface LinkComponentProps {
  text: string;
  to: string;
}

function LinkComponent(props: LinkComponentProps) {
  const navigate = useNavigate();

  function handleLinkText(): string[] {
    const words = props.text.split(' ');
    const hereWordIndex = words.indexOf('aqui');
    const lastWord = words.splice(hereWordIndex);
    const title = words.join(' ');
    const subtitle = lastWord.join(' ');

    return [title, subtitle];
  }

  const [title, subtitle] = handleLinkText();

  return (
    <FlexWrapper className={styles.container} orientation={'row'}>
      <Text className={'primary'} text={title} />
      <span onClick={() => navigate(props.to)}>{subtitle}</span>
    </FlexWrapper>
  );
}

export default LinkComponent;
