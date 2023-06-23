import { Clock, User } from '@phosphor-icons/react';
import { Text } from '../../base/Text';
import styles from './styles.module.scss';
import Review from '../../../../../core/domain/models/Review';

interface Props {
  props?: Review;
}

function Reviewer({ props }: Props) {
  return (
    <Text className={styles.container} size="medium">
      <span className={styles.user}>
        <User size={32} />
        {props?.name}
      </span>

      <span className={styles.time} title="horário da criação da resenha">
        <Clock size={18} />{' '}
        {new Date(props?.created_at ?? '').toLocaleTimeString()}
      </span>
    </Text>
  );
}

export { Reviewer };
