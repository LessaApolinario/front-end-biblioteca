import { ReactNode, createRef, useState } from 'react'
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
import ItemsList from '../components/ItemsList'

import { useReviews } from '../../hooks/useReviews'
import { useFields } from '../../hooks/useFields'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../hooks/useNotifications'

import ReviewBuilder from '../../core/domain/builders/ReviewBuilder'

function ReviewPage() {
  const useAuthHook = useAuth()
  const useFieldsHook = useFields()
  const useReviewsHook = useReviews()
  const useNotificationsHook = useNotifications()
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const bookTitleRef = createRef<HTMLInputElement>()
  const authorNameRef = createRef<HTMLInputElement>()
  const reviewTextareaRef = createRef<HTMLTextAreaElement>()
  const searchRef = createRef<HTMLInputElement>()

  function goBack() {
    navigate(-1)
  }

  function buildReview() {
    const user = useAuthHook.user
    const review = new ReviewBuilder()
      .withUserID(user?.id)
      .withUserName(user?.name)
      .withTitleBook(bookTitleRef.current?.value)
      .withWriter(authorNameRef.current?.value)
      .withReview(reviewTextareaRef.current?.value)
      .withAvailable(true)
      .build()

    return review
  }

  async function addReview() {
    try {
      const review = buildReview()
      await useReviewsHook.createReview(review)
    } catch (error: any) {
      useNotificationsHook.notifyError(error.message)
    }
  }

  const handleAddReview = async (event: React.FormEvent) => {
    event.preventDefault()
    const bookInput = bookTitleRef.current
    const authorInput = authorNameRef.current
    const reviewTextarea = reviewTextareaRef.current

    useFieldsHook.validateAllInputs([
      bookInput,
      authorInput,
    ])
    useFieldsHook.validateTextArea(reviewTextarea)

    await addReview()

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
            <Input
              type={'text'}
              name={'livro'}
              ref={bookTitleRef} />
          </FlexWrapper>

          <FlexWrapper className={styles.fullWidth} orientation={'column'}>
            <Label text={'Autor'} />
            <Input
              type={'text'}
              name={'autor'}
              ref={authorNameRef} />
          </FlexWrapper>

          <FlexWrapper className={styles.review} orientation={'column'}>
            <Label text={'Resenha'} />
            <TextArea
              name={'resenha'}
              id={'reviewTextArea'}
              cols={30}
              rows={5}
              ref={reviewTextareaRef}></TextArea>
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
    goBack()
  }

  const redirectToReviewsDetails = (item: Review) => {
    navigate(`/reviews/review/${item._id}`, { state: item })
  }

  function renderItem(item: Review): ReactNode {
    return <ReviewItem
      data={item}
      onClick={() => redirectToReviewsDetails}
    />
  }

  const handleSearchReview = async () => {
    const searchInput = searchRef?.current
    const query = searchRef.current?.value ?? ''
    useFieldsHook.validateInput(searchInput)
    await useReviewsHook.searchReview(query)
  }

  const renderButtons = () => {
    if (useAuthHook.isAuthenticated) {
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
          onClick={goBack}
        >Voltar</Button>
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
        <Input
          type={'text'}
          name={'pesquisa'}
          ref={searchRef} />
        <Button
          type='button'
          btnType='secondary'
          onClick={handleSearchReview}>Pesquisar</Button>
      </div>

      <h2>Resenhas</h2>

      {renderForm()}

      <ItemsList<Review>
        data={useReviewsHook.data}
        orientation={'row'}
        renderItem={renderItem} />
    </div>
  )
}

export default ReviewPage
