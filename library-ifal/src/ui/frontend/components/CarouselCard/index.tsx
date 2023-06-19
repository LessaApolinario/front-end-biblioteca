import { useNavigate } from 'react-router-dom';
import { Text } from '../base/Text';
import styles from './styles.module.scss';

interface Props {
  to?: string;
  src?: string;
  text: string;
}

function CarouselCard({ to, src, text }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img onClick={() => navigate(to || '/books')} src={src} alt="" />
      <Text size="medium">{text}</Text>
    </div>
  );
}

export default CarouselCard;
