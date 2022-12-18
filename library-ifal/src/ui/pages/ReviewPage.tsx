import { createRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import ReviewItem from '../components/ReviewItem'
import Header from '../components/Header'

import { BsPlusCircleFill } from 'react-icons/bs'
import { GiTreeBranch } from 'react-icons/gi'
import { RiCloseCircleFill } from 'react-icons/ri'

import styles from '../styles/pages/ReviewPage.module.scss'

import Review from '../../core/domain/models/Review'

import Label from '../components/Label'
import Input from '../components/Input'
import FlexWrapper from '../components/FlexWrapper'
import TextArea from '../components/TextArea'

import { useReviews } from '../../hooks/useReviews'
import { useFields } from '../../hooks/useFields'
import { useAuth } from '../../hooks/useAuth'

function ReviewPage() {
  const { reviews, addReview, searchReview } = useReviews()
  const { validateAllInputs, validateTextArea } = useFields()
  const useAuthHook = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const bookTitleRef = createRef<HTMLInputElement>()
  const authorNameRef = createRef<HTMLInputElement>()
  const reviewTextareaRef = createRef<HTMLTextAreaElement>()
  const searchRef = createRef<HTMLInputElement>()

  const handleAddReview = async (event: React.FormEvent) => {
    event.preventDefault()
    const bookInput = bookTitleRef.current
    const authorInput = authorNameRef.current
    const reviewTextarea = reviewTextareaRef.current

    validateAllInputs([
      bookInput,
      authorInput,
    ])
    validateTextArea(reviewTextarea)
    
    const user = useAuthHook.user
    const newReview = new Review()
    newReview.user_id = user?.id
    newReview.name = user?.name
    newReview.title_book = bookTitleRef.current?.value
    newReview.writer = authorNameRef.current?.value
    newReview.review = reviewTextareaRef.current?.value
    newReview.available = true

    await addReview(newReview)

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

  const renderForm = () => {
    if (isVisible) {
      return (
        <form className={styles.form} onSubmit={handleAddReview}>
          <h3>Escreva sua resenha</h3>

          <FlexWrapper className={styles.fullWidth} orientation={'column'}>
            <Label text={'Livro'} />
            <Input type={'text'} name={'livro'} ref={bookTitleRef} />
          </FlexWrapper>

          <FlexWrapper className={styles.fullWidth} orientation={'column'}>
            <Label text={'Autor'} />
            <Input type={'text'} name={'autor'} ref={authorNameRef} />
          </FlexWrapper>

          <FlexWrapper className={styles.review} orientation={'column'}>
            <Label text={'Resenha'} />
            <TextArea name={'resenha'} id={'reviewTextArea'} cols={30} rows={5} ref={reviewTextareaRef}></TextArea>
          </FlexWrapper>

          <Button
            type='submit'
            btnType='secondary'
          >
            Escrever
          </Button>
        </form>
      )
    }
  }

  const logout = async () => {
    await useAuthHook.logout()
    navigate(-1)
  }

  const redirectToReviewsDetails = (item: Review) => {
    navigate(`/reviews/review/${item._id}`, { state: item })
  }

  const handleSearchReview = async () => {
    const query = searchRef.current?.value ?? ''
    await searchReview(query)
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
            key={item._id}
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
