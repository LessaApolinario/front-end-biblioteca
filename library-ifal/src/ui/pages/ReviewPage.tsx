import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useReviews } from '../../hooks/useReviews';
import { useAuth } from '../../hooks/useAuth';

import Review from '../../core/domain/models/Review';

import Button from '../components/Button';
import ButtonsHeader from '../components/ButtonsHeader';
import Form from '../components/Form';
import Flex from '../components/Flex';
import Input from '../components/Input';
import ItemsList from '../components/ItemsList';
import Label from '../components/Label';
import OpenCloseButton from '../components/OpenCloseButton';
import ReviewItem from '../components/ReviewItem';
import TextArea from '../components/TextArea';

import styles from '../styles/pages/ReviewPage.module.scss';

function ReviewPage() {
  const { isAuthenticated, logout } = useAuth();
  const { addReview, searchReview, data, refs } = useReviews();
  const { bookTitleRef, authorNameRef, reviewTextareaRef, searchRef } = refs;
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  async function handleAddReview() {
    await addReview();
    setIsVisible(false);
  }

  function goBack() {
    navigate(-1);
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

    return <></>;
  };

  function RenderSearchReviewForm() {
    return (
      <Form
        className={styles.search}
        orientation={'row'}
        handleSubmit={searchReview}
      >
        <Input type={'text'} name={'pesquisa'} ref={searchRef} />
        <Button type="submit" btnType="secondary">
          Pesquisar
        </Button>
      </Form>
    );
  }

  const handleLogout = async () => {
    await logout();
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

  function renderButtons() {
    if (isAuthenticated) {
      return (
        <Button type="button" btnType="secondary" onClick={handleLogout}>
          Sair
        </Button>
      );
    }

    return (
      <Button type="button" btnType="secondary" onClick={goBack}>
        Voltar
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

      <RenderSearchReviewForm />

      <h2>Resenhas</h2>

      <RenderAddReviewForm />

      <ItemsList<Review>
        data={data}
        orientation={'row'}
        renderItem={renderItem}
      />
    </div>
  );
}

export default ReviewPage;
