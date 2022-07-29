import styles from '../styles/components/Review.module.scss'

interface ReviewProps {
  username: string
  bookTitle: string
  authorName: string
  review: string
}

function Review({ username, bookTitle, authorName, review }: ReviewProps) {
  return (
    <article className={styles.container}>
      <h3>{username} sobre {bookTitle} de {authorName}:</h3>

      <p className={styles.review}>
        {review}
      </p>
    </article>
  )
}

export default Review
