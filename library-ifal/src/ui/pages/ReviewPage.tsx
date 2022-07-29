import { createRef, useRef, useState } from 'react'

import ReviewDTO from '../../core/dto/ReviewDTO'

import Button from '../components/Button'
import Review from '../components/Review'

import styles from '../styles/pages/ReviewPage.module.scss'

function ReviewPage() {
  const username = 'Lessa'
  const bookTitle = 'Core Java'
  const authorName = 'Algum autor'

  const initialReviews: ReviewDTO[] = [
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    }
  ]

  const [reviews, setReviews] = useState<ReviewDTO[]>(initialReviews)
  const buttonRef = createRef<HTMLButtonElement>()
  const bookTitleRef = useRef<HTMLInputElement>(null)
  const authorNameRef = useRef<HTMLInputElement>(null)
  const reviewTextareaRef = useRef<HTMLTextAreaElement>(null)

  const handleFields = () => {
    const bookInput = bookTitleRef.current
    const authorInput = authorNameRef.current
    const reviewTextarea = reviewTextareaRef.current

    if (bookInput && authorInput && reviewTextarea) {
      const bookTitle = bookInput.value
      const authorName = authorInput.value
      const review = reviewTextarea.value

      return {
        bookTitle,
        authorName,
        review
      }
    }
  }

  const handleAddReview = () => {
    const button = buttonRef.current

    if (button) {
      const newReview = handleFields()

      if (newReview) {
        const { bookTitle, authorName, review } = newReview

        if (bookTitle !== '' && authorName !== '' && review !== '') {
          setReviews((previousReviews) => [
            {
              username,
              bookTitle,
              authorName,
              review
            },
            ...previousReviews
          ])
        }
      }
    }
  }

  return (
    <div className={styles.container}>
      <h2>Resenhas</h2>

      <form action="#" method='POST' className={styles.form}>
        <h3>Escreva sua resenha</h3>

        <div className={styles.book}>
          <label>Livro</label>
          <input type="text" ref={bookTitleRef} />
        </div>

        <div className={styles.author}>
          <label>Autor</label>
          <input type="text" ref={authorNameRef} />
        </div>
        
        <div className={styles.review}>
          <label>Resenha</label>
          <textarea cols={30} rows={5} ref={reviewTextareaRef}></textarea>
        </div>

        <Button 
          ref={buttonRef} 
          type='button' 
          btnType='secondary' 
          onClick={handleAddReview}
        >
          Escrever
        </Button>
      </form>
      <div className={styles.reviews}>
        {reviews?.map(({ username, bookTitle, authorName, review }) => (
          <Review
            key={Math.random().toString()}
            username={username}
            bookTitle={bookTitle}
            authorName={authorName}
            review={review}
          />
        ))}
      </div>
    </div>
  )
}

export default ReviewPage
