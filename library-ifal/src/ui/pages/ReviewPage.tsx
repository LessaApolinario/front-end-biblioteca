import { ReactNode, createRef, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useReviews } from '../../hooks/useReviews';
import { useRouter } from '../../hooks/useRouter';

import Review from '../../core/domain/models/Review';

import ReviewBuilder from '../../core/domain/builders/ReviewBuilder';

import Button from '../components/Button';
import ButtonsHeader from '../components/ButtonsHeader';
import Form from '../components/Form';
import Flex from '../components/Flex';
import Input from '../components/Input';
import ItemsList from '../components/ItemsList';
import Label from '../components/Label';
import OpenCloseButton from '../components/OpenCloseButton';
import ReviewItem from '../components/ReviewItem';
import SearchForm from '../components/SearchForm';
import TextArea from '../components/TextArea';

import getFieldFromRef from '../../core/utils/getFieldFromRef';

import styles from '../styles/pages/ReviewPage.module.scss';

function ReviewPage() {
  const [isVisible, setIsVisible] = useState(false);
  const bookTitleRef = createRef<HTMLInputElement>();
  const authorNameRef = createRef<HTMLInputElement>();
  const reviewTextareaRef = createRef<HTMLTextAreaElement>();
  const searchRef = createRef<HTMLInputElement>();
  const { redirectToDetailsPage, redirectToPreviousPage } = useRouter();
  const { isAuthenticated, getUser, logout } = useAuth();
  const { user } = getUser();
  const { search, create, getReviews } = useReviews();
  const { reviews } = getReviews();

  async function handleSearchReview() {
    const { field: query } = getFieldFromRef(searchRef);
    await search(query);
  }

  async function handleCreateReview() {
    await create(buildReview());
    setIsVisible(false);
  }

  function buildReview() {
    return new ReviewBuilder(user?.name)
      .withUserID(user?.id)
      .withTitleBook(bookTitleRef.current?.value)
      .withWriter(authorNameRef.current?.value)
      .withReview(reviewTextareaRef.current?.value)
      .withAvailable(true)
      .build();
  }

  const RenderAddReviewForm = () => {
    if (!!isVisible) {
      return (
        <Form
          className={styles.form}
          orientation={'column'}
          handleSubmit={handleCreateReview}
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

    return <></>;
  };

  const handleLogout = async () => {
    await logout();
    redirectToPreviousPage();
  };

  const redirectToReviewsDetailsPage = (item: Review) => {
    redirectToDetailsPage<Review>(`/reviews/review/${item._id}`, item);
  };

  function renderItem(item: Review): ReactNode {
    return (
      <ReviewItem
        data={item}
        onClick={() => redirectToReviewsDetailsPage(item)}
      />
    );
  }

  function renderButtons() {
    if (isAuthenticated) {
      return (
        <Button type="button" btnType="secondary" onClick={handleLogout}>
          Sair
        </Button>
      );
    }

    return (
      <Button
        type="button"
        btnType="secondary"
        onClick={redirectToPreviousPage}
      >
        Voltar
      </Button>
    );
  }

  function renderSearchFormButtons() {
    return (
      <Button type="submit" btnType="secondary">
        Pesquisar
      </Button>
    );
  }

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

      <SearchForm
        placeholder={'Buscar resenhas'}
        searchRef={searchRef}
        handleSubmit={handleSearchReview}
        renderButtons={renderSearchFormButtons}
      />

      <h2>Resenhas</h2>

      <RenderAddReviewForm />

      <ItemsList<Review>
        data={reviews}
        orientation={'row'}
        renderItem={renderItem}
      />
    </div>
  );
}

export default ReviewPage;
