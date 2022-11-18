import { createRef, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import ReviewItem from '../components/ReviewItem'
import Header from '../components/Header'

import { BsPlusCircleFill } from 'react-icons/bs'
import { GiTreeBranch } from 'react-icons/gi'
import { RiCloseCircleFill } from 'react-icons/ri'

import styles from '../styles/pages/ReviewPage.module.scss'

import { AuthCTX } from '../contexts/AuthCTX'
import { ReviewsCTX } from '../contexts/ReviewsCTX'

import Review from '../../core/domain/models/Review'
import ReviewService from '../../services/ReviewService'

function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [warning, setWarning] = useState(false)
  const navigate = useNavigate()
  const buttonRef = createRef<HTMLButtonElement>()
  const bookTitleRef = useRef<HTMLInputElement>(null)
  const authorNameRef = useRef<HTMLInputElement>(null)
  const reviewTextareaRef = useRef<HTMLTextAreaElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
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

  const handleAddReview = async () => {
    const button = buttonRef.current
    const bookInput = bookTitleRef.current
    const authorInput = authorNameRef.current
    const reviewTextarea = reviewTextareaRef.current
    const user = authCTX.user

    if (!button || !bookInput || !authorInput || !reviewTextarea) {
      return
    }

    if (
      authorInput.value.length === 0 ||
      reviewTextarea.value.length === 0 ||
      bookInput.value.length === 0
    ) {
      return
    }

    if (!user) {
      return
    }

    const isLoggedUser = localStorage.getItem('token')

    if (isLoggedUser === null) {
      return
    }

    const { id, name } = user

    if (!id || !name) {
      return
    }

    const newReview = new Review()
    newReview.user_id = id
    newReview.name = name
    newReview.title_book = bookTitleRef.current.value
    newReview.writer = authorNameRef.current.value
    newReview.review = reviewTextareaRef.current.value
    newReview.available = true

    const reviewCreated = await reviewsCTX.create(newReview)

    setReviews((previousState) => [
      reviewCreated,
      ...previousState
    ])

    setIsVisible(false)
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

  useEffect(() => {
    const storagedUser = localStorage.getItem('user')
    const storagedToken = localStorage.getItem('token')

    if (!storagedUser && !storagedToken) {
      buttonRef.current?.setAttribute('disabled', 'true')
    } else {
      buttonRef.current?.removeAttribute('disabled')
    }
  }, [buttonRef])

  useEffect(() => {
    const storagedUser = localStorage.getItem('user')
    const storagedToken = localStorage.getItem('token')

    if (!storagedUser && !storagedToken) {
      setWarning(true)
    } else {
      setWarning(false)
    }
  }, [])

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
          {
            warning
            &&
            <p className={styles.warning}>Faça login para criar resenhas</p>
          }
        </form>
      )
    }
  }

  const logout = () => {
    authCTX.logout()
    navigate(-1)
  }

  const redirectToReviewsDetails = (item: Review) => {
    navigate(`/reviews/review/${item._id}`, { state: item })
  }

  const handleSearchReview = async () => {
    const query = searchRef.current?.value

    if (!query) {
      return
    }

    const reviewService = new ReviewService()
    const data = await reviewService.search(query)
    const isEmpty = !data.length

    if (!isEmpty) {
      setReviews(data)
    }
  }

  const renderButtons = () => {
    const storagedUser = localStorage.getItem('user')
    const storagedToken = localStorage.getItem('token')

    if (storagedUser !== null && storagedToken !== null) {
      return (
        <Button
          type='button'
          btnType='secondary'
          onClick={logout}
        >
          Sair
        </Button>
      )
    } else {
      return (
        <Button
          type='button'
          btnType='secondary'
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      )
    }
  }

  return (
    <div className={styles.container}>
      <Header>
        <>
          <GiTreeBranch />

          <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/books')}>Livros</li>
            <li onClick={() => navigate('/reviews')}>Resenhas</li>
            <li onClick={() => navigate('/hints')}>Dicas</li>
            <li onClick={() => navigate('/contact')}>Contato</li>
          </ul>

          {renderButtons()}
        </>
      </Header>

      <div className={styles.plusIcon}>
        {renderOpenOrCloseIcon()}
      </div>

      <div className={styles.search}>
        <input type='text' ref={searchRef} />
        <Button
          type='button'
          btnType='secondary'
          onClick={handleSearchReview}
        >
          Pesquisar
        </Button>
      </div>

      <h2>Resenhas</h2>

      {renderForm()}

      <div className={styles.reviews}>
        {reviews?.map(item => (
          <ReviewItem
            key={Math.random().toString()}
            name={item.name}
            title_book={item.title_book ?? ''}
            writer={item.writer ?? ''}
            review={item.review ?? ''}
            created_at={item.created_at}
            onClick={() => redirectToReviewsDetails(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default ReviewPage
