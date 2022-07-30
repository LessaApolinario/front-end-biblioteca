import { createRef, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ReviewDTO from '../../core/dto/ReviewDTO'

import Button from '../components/Button'
import Review from '../components/Review'
import Header from '../components/Header'

import { BsPlusCircleFill } from 'react-icons/bs'
import { GiTreeBranch } from 'react-icons/gi'

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
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nihil maiores dolorum. Cupiditate, labore? Accusamus voluptatibus temporibus quam quae in illo praesentium mollitia, fuga pariatur ea nulla nihil tempore culpa. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab iusto repudiandae neque repellendus. Mollitia blanditiis quasi eaque vitae iure ab, autem commodi earum, dignissimos saepe quam incidunt repellat fuga sunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fugiat, laborum rerum qui exercitationem, molestias harum dolores culpa fuga, ex officia sapiente alias modi fugit voluptas quia voluptatem facilis doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos iusto eius nostrum maiores molestias voluptas rem ducimus eos, hic nulla enim fuga magni alias ipsum in quia ratione delectus adipisci.'
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nihil maiores dolorum. Cupiditate, labore? Accusamus voluptatibus temporibus quam quae in illo praesentium mollitia, fuga pariatur ea nulla nihil tempore culpa. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab iusto repudiandae neque repellendus. Mollitia blanditiis quasi eaque vitae iure ab, autem commodi earum, dignissimos saepe quam incidunt repellat fuga sunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fugiat, laborum rerum qui exercitationem, molestias harum dolores culpa fuga, ex officia sapiente alias modi fugit voluptas quia voluptatem facilis doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos iusto eius nostrum maiores molestias voluptas rem ducimus eos, hic nulla enim fuga magni alias ipsum in quia ratione delectus adipisci.'
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
    },
    {
      username,
      bookTitle,
      authorName,
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse magnam earum maxime fugiat voluptates, perspiciatis cupiditate, quos dolores reiciendis ipsa facere nam aspernatur fuga omnis molestias neque debitis sint!'
    }
  ]

  const [reviews, setReviews] = useState<ReviewDTO[]>(initialReviews)
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
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

          setIsVisible(false)
        }
      }
    }
  }

  return (
    <div className={styles.container}>
      <Header>
        <GiTreeBranch />
        
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/genres')}>Gêneros</li>
          <li onClick={() => navigate('/books')}>Livros</li>
          <li onClick={() => navigate('/hints')}>Dicas</li>
          <li onClick={() => navigate('/contact')}>Contato</li>
        </ul>

        <Button
          type='button'
          btnType='secondary'
          onClick={() => navigate('/')}
        >
          Sair
        </Button>
      </Header>

    <div className={styles.plusIcon}>
      <BsPlusCircleFill
        onClick={
          () => setIsVisible(!isVisible)
        }
        title='Adicionar resenha'
      />
    </div>

    <h2>Resenhas</h2>

    {isVisible &&
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
    }

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
