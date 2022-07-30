import { useEffect, useRef } from 'react'

import styles from '../styles/components/Review.module.scss'

interface ReviewProps {
  username: string
  bookTitle: string
  authorName: string
  review: string
  onClick?(): void
}

function Review({ username, bookTitle, authorName, review, onClick }: ReviewProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
 
  useEffect(() => {
    const paragraph = paragraphRef.current

    if (paragraph) {
      if (
        paragraph.textContent?.length && 
        paragraph.textContent?.length >= 500
      ) {
        paragraph.classList.add(`${styles['hiddenText']}`)
      }
    }
  }, [])

  return (
    <article className={styles.container}>
      <h3>{username} sobre {bookTitle} de {authorName}:</h3>

      <p
        className={styles.review}
        title='Clique para ver detalhes da resenha'
        ref={paragraphRef}
        onClick={onClick}
      >
        {review}
      </p>
    </article>
  )
}

export default Review
