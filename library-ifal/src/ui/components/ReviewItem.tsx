import Review from '../../core/domain/models/Review';

import styles from '../styles/components/Review.module.scss';

interface ReviewItemProps {
  data: Review;
  onClick?(): void;
}

function ReviewItem({ data, onClick }: ReviewItemProps) {
  const abbreviateMonth = (month: string) => {
    const abbreviatedMonths: Record<string, string> = {
      '01': 'Ja',
      '02': 'Fev',
      '03': 'Mar',
      '04': 'Abr',
      '05': 'Maio',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Ago',
      '09': 'Set',
      '10': 'Out',
      '11': 'Nov',
      '12': 'Dez',
    };

    return abbreviatedMonths[month] ?? 'Não existe um mês correspondente';
  };

  const formatDate = () => {
    const date = data.created_at?.slice(0, 10);
    const time = data.created_at?.slice(11, 16);

    if (date && time) {
      const [hours, minutes] = time?.split(':');
      const [year, month, day] = date.split('-');

      const abbreviatedMonth = abbreviateMonth(month);
      return `${abbreviatedMonth} ${day} ${year} às ${hours}:${minutes}`;
    }

    return '';
  };

  return (
    <article className={styles.container}>
      <h3>
        {data.name} sobre {data.title_book} de {data.writer}:
      </h3>

      <p
        className={styles.review}
        title="Clique para ver detalhes da resenha"
        onClick={onClick}
      >
        {data.review}
      </p>

      <p className={styles.date}>{formatDate()}</p>
    </article>
  );
}

export default ReviewItem;
