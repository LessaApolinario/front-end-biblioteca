import { useNavigate } from 'react-router-dom';
import Review from '../../../../../core/domain/models/Review';
import { Text } from '../../base/Text';
import { Reviewer } from '../Reviewer';
import styles from './styles.module.scss';

interface Props {
  props?: Review;
}

function ReviewCard({ props }: Props) {
  const navigate = useNavigate();

  function redirectToDetails() {
    navigate(`/reviews/review/${props?._id}`, { state: props });
  }

  return (
    <div className={styles.container} onClick={redirectToDetails}>
      <Reviewer props={props} />

      <Text size="medium">
        {props?.title_book} de {props?.writer}
      </Text>
      <Text className={styles.review} size="medium">
        {props?.review}
      </Text>
    </div>
  );
}

export { ReviewCard };
