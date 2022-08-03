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
import { ReviewsCTX } from '../contexts/ReviewsCTX'

function ReviewPage() {
  const [reviews, setReviews] = useState<ReviewDTO[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const buttonRef = createRef<HTMLButtonElement>()
  const bookTitleRef = useRef<HTMLInputElement>(null)
  const authorNameRef = useRef<HTMLInputElement>(null)
  const reviewTextareaRef = useRef<HTMLTextAreaElement>(null)
  const authCTX = useContext(AuthCTX)
  const reviewsCTX = useContext(ReviewsCTX)

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await reviewsCTX.fetch()
      reviews.reverse()
      setReviews(reviews)
    }

    getReviews()
    // eslint-disable-next-line
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
          isLoggedIn && typeof authCTX.user !== 'undefined') {
          const user = authCTX.user
          const _review: ReviewDTO = {
            user_id: user._id,
            name: user.name,
            title_book,
            writer,
            review,
            available: true
          }

          const r = await reviewsCTX.add(_review)

          setReviews((previousState) => [
            r,
            ...previousState
          ])

          setIsVisible(false)
        }
      }
    }
  }

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

  const logout = () => {
    authCTX.logout()
    navigate(-1)
  }

  const redirectToReviewsDetails = (item: ReviewDTO) => {
    navigate(`/reviews/review/${item._id}`, { state: item })
  }

  return (
    <div className={styles.container}>
      <Header>
        <GiTreeBranch />
        
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/synopsis')}>Sinopses</li>
          <li onClick={() => navigate('/books')}>Livros</li>
          <li onClick={() => navigate('/hints')}>Dicas</li>
          <li onClick={() => navigate('/contact')}>Contato</li>
        </ul>

        <Button
          type='button'
          btnType='secondary'
          onClick={logout}
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
        {reviews?.map(item => (
          <Review
            key={Math.random().toString()}
            name={item.name}
            title_book={item.title_book}
            writer={item.writer}
            review={item.review}
            created_at={item.created_at}
            onClick={() => redirectToReviewsDetails(item)}
        />
        ))}
      </div>
    </div>
  )
}

export default ReviewPage
