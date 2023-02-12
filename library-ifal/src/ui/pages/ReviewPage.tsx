import { ReactNode, createRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useReviews } from '../../hooks/useReviews';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';

import Review from '../../core/domain/models/Review';

import Button from '../components/Button';
import ButtonsHeader from '../components/ButtonsHeader';
import Form from '../components/Form';
import Flex from '../components/Flex';
import Input from '../components/Input';
import ItemsList from '../components/ItemsList';
import Label from '../components/Label';
import OpenCloseButton from '../components/OpenCloseButton';
import ReviewBuilder from '../../core/domain/builders/ReviewBuilder';
import ReviewItem from '../components/ReviewItem';
import TextArea from '../components/TextArea';

import styles from '../styles/pages/ReviewPage.module.scss';

function ReviewPage() {
  const useAuthHook = useAuth();
  const useReviewsHook = useReviews();
  const useNotificationsHook = useNotifications();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const bookTitleRef = createRef<HTMLInputElement>();
  const authorNameRef = createRef<HTMLInputElement>();
  const reviewTextareaRef = createRef<HTMLTextAreaElement>();
  const searchRef = createRef<HTMLInputElement>();

  function goBack() {
    navigate(-1);
  }

  function buildReview() {
    const user = useAuthHook.user;
    const review = new ReviewBuilder()
      .withUserID(user?.id)
      .withUserName(user?.name)
      .withTitleBook(bookTitleRef.current?.value)
      .withWriter(authorNameRef.current?.value)
      .withReview(reviewTextareaRef.current?.value)
      .withAvailable(true)
      .build();

    return review;
  }

  async function addReview() {
    try {
      const review = buildReview();
      await useReviewsHook.createReview(review);
    } catch (error: any) {
      useNotificationsHook.notifyError(error.message);
    }
  }

  async function handleAddReview() {
    await addReview();
    setIsVisible(false);
  }

  const RenderAddReviewForm = () => {
    if (!!isVisible) {
      return (
        <Form
          className={styles.form}
          orientation={'column'}
          handleSubmit={handleAddReview}
        >
          <h3>Escreva sua resenha</h3>

          <Flex className={styles.fullWidth} orientation={'column'}>
            <Label text={'Livro'} />
            <Input type={'text'} name={'livro'} ref={bookTitleRef} />
          </Flex>

          <Flex className={styles.fullWidth} orientation={'column'}>
            <Label text={'Autor'} />
            <Input type={'text'} name={'autor'} ref={authorNameRef} />
          </Flex>

          <Flex className={styles.review} orientation={'column'}>
            <Label text={'Resenha'} />
            <TextArea
              name={'resenha'}
              id={'reviewTextArea'}
              cols={30}
              rows={5}
              ref={reviewTextareaRef}
            ></TextArea>
          </Flex>

          <Button type="submit" btnType="secondary">
            Escrever
          </Button>
        </Form>
      );
    }

    return null;
  };

  function SearchReviewForm() {
    return (
      <Form
        className={styles.search}
        orientation={'row'}
        handleSubmit={handleSearchReview}
      >
        <Input type={'text'} name={'pesquisa'} ref={searchRef} />
        <Button type="submit" btnType="secondary">
          Pesquisar
        </Button>
      </Form>
    );
  }

  const logout = async () => {
    await useAuthHook.logout();
    goBack();
  };

  const redirectToReviewsDetails = (item: Review) => {
    navigate(`/reviews/review/${item._id}`, { state: item });
  };

  function renderItem(item: Review): ReactNode {
    return (
      <ReviewItem data={item} onClick={() => redirectToReviewsDetails(item)} />
    );
  }

  async function handleSearchReview() {
    const query = searchRef.current?.value ?? '';
    await useReviewsHook.searchReview(query);
  }

  const renderButtons = () => {
    if (useAuthHook.isAuthenticated) {
      return (
        <Button type="button" btnType="secondary" onClick={logout}>
          Sair
        </Button>
      );
    } else {
      return (
        <Button type="button" btnType="secondary" onClick={goBack}>
          Voltar
        </Button>
      );
    }
  };

  return (
    <div className={styles.container}>
      <ButtonsHeader headerType={'secondary'} renderButtons={renderButtons} />

      <OpenCloseButton
        className={'secondary'}
        closeText={'Fechar'}
        addItemText={'Adicionar resenha'}
        isVisible={isVisible}
        onClick={() => setIsVisible(!isVisible)}
      />

      <SearchReviewForm />

      <h2>Resenhas</h2>

      <RenderAddReviewForm />

      <ItemsList<Review>
        data={useReviewsHook.data}
        orientation={'row'}
        renderItem={renderItem}
      />
    </div>
  );
}

export default ReviewPage;
