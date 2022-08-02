import { createRef, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ReviewDTO from '../../core/dto/ReviewDTO'

import Button from '../components/Button'
import Review from '../components/Review'
import Header from '../components/Header'

import { BsPlusCircleFill } from 'react-icons/bs'
import { GiTreeBranch } from 'react-icons/gi'
import { RiCloseCircleFill } from 'react-icons/ri'

import styles from '../styles/pages/ReviewPage.module.scss'

import { AuthCTX } from '../contexts/AuthCTX'

import api from '../../services/api'

function ReviewPage() {
  const [reviews, setReviews] = useState<ReviewDTO[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const buttonRef = createRef<HTMLButtonElement>()
  const bookTitleRef = useRef<HTMLInputElement>(null)
  const authorNameRef = useRef<HTMLInputElement>(null)
  const reviewTextareaRef = useRef<HTMLTextAreaElement>(null)
  const { user, logout } = useContext(AuthCTX)

  useEffect(() => {
    const getReviews = async () => {
      const { data } = await api.get<ReviewDTO[]>('/api/reviews')
  
      setReviews(data)
    }

    getReviews()
  }, [])

  const handleFields = () => {
    const bookInput = bookTitleRef.current
    const authorInput = authorNameRef.current
    const reviewTextarea = reviewTextareaRef.current

    if (bookInput && authorInput && reviewTextarea) {
      const title_book = bookInput.value
      const writer = authorInput.value
      const review = reviewTextarea.value

      return {
        title_book,
        writer,
        review
      }
    }
  }

  const handleAddReview = async () => {
    const button = buttonRef.current

    if (button) {
      const newReview = handleFields()

      if (newReview) {
        const { title_book, review, writer } = newReview

        const isLoggedIn = Boolean(localStorage.getItem('user') 
          && localStorage.getItem('token'))

        if (title_book !== '' && review !== '' && 
          isLoggedIn && typeof user !== 'undefined') {
          const _review: ReviewDTO = {
            user_id: user?._id,
            name: user?.name,
            title_book,
            writer,
            review,
          }

          setReviews((previousReviews) => [
            _review,
            ...previousReviews
          ])

          const response = await api.post('/api/reviews/', JSON.stringify(_review), {
            headers: {
              'Content-type': 'application/json'
            }
          })

          console.log('O que foi enviado: ', response.data)

          setIsVisible(false)
        }
      }
    }
  }

  // useEffect(() => {
  //   if (initialReviews) {
  //     setReviews(initialReviews)
  //   }
  // }, [initialReviews])

  const renderOpenOrCloseIcon = () => {
    if (isVisible) {
      return (
        <RiCloseCircleFill
          onClick={
            () => setIsVisible(!isVisible)
          }
          title='Fechar'
        />
      )
    } else {
      return (
        <BsPlusCircleFill
          onClick={
            () => setIsVisible(!isVisible)
          }
          title='Adicionar resenha'
        />
      )
    }
  }

  const renderForm = () => {
    if (isVisible) {
      return (
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
      )
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
      {renderOpenOrCloseIcon()}
    </div>

    <h2>Resenhas</h2>

      {renderForm()}

      <div className={styles.reviews}>
        {reviews?.map(({ user_id, name, title_book, writer, review, created_at }) => (
          <Review
            key={Math.random().toString()}
            name={name}
            title_book={title_book}
            writer={writer}
            review={review}
            created_at={created_at}
            onClick={() => navigate(`/reviews/review/${user_id}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default ReviewPage
