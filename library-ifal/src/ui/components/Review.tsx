import BookDTO from '../../core/dto/BookDTO'
import User from '../../core/models/User'

import styles from '../styles/components/Review.module.scss'

interface ReviewProps {
  user: User
  book: BookDTO
  review: string
}

function Review({ user, book, review }: ReviewProps) {
  const { username } = user
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
