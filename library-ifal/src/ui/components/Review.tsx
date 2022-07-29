import BookDTO from '../../core/dto/BookDTO'

import styles from '../styles/components/Review.module.scss'

interface ReviewProps {
  username: string
  book: BookDTO
  review: string
}

function Review({ username, book, review }: ReviewProps) {
  const { titulo, autor } = book

  return (
    <article className={styles.container}>
      <h3>{username} sobre {titulo} de {autor}:</h3>

      <p className={styles.review}>
        {review}
      </p>
    </article>
  )
}

export default Review
