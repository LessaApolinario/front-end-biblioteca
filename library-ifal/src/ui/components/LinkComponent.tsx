import { useRouter } from '../../hooks/useRouter';

import Text from './Text';
import Flex from './Flex';

import styles from '../styles/components/LinkComponent.module.scss';

interface LinkComponentProps {
  text: string;
  to: string;
}

function LinkComponent(props: LinkComponentProps) {
  const { goto } = useRouter();

  const redirectToPage = () => goto(props.to);

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
    <Flex className={styles.container} orientation={'row'}>
      <Text className={'primary'} text={title} />
      <span onClick={redirectToPage}>{subtitle}</span>
    </Flex>
  );
}

export default LinkComponent;
