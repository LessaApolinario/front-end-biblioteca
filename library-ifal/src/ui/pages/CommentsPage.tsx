import { createRef, useRef } from 'react';

import styles from '../styles/pages/CommentsPage.module.scss';

import AuthenticationButtons from '../components/AuthenticationButtons';
import Button from '../components/Button';
import ButtonsHeader from '../components/ButtonsHeader';
import Comment from '../../core/domain/models/Comment';
import Label from '../components/Label';
import Input from '../components/Input';
import FlexWrapper from '../components/FlexWrapper';
import TextArea from '../components/TextArea';

import { useAuth } from '../../hooks/useAuth';
import { useFields } from '../../hooks/useFields';
import { useNotifications } from '../../hooks/useNotifications';

import WebDIContainer from '../../dicontainer/web';

function CommentsPage() {
  const { isAuthenticated, logout } = useAuth();
  const { validateAllInputs, validateTextArea } = useFields();
  const { notifySuccess, notifyError } = useNotifications();
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const commentRef = createRef<HTMLTextAreaElement>();

  async function createComment() {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const comment = commentRef.current?.value;

    const newComment = new Comment();
    newComment.name = name;
    newComment.email = email;
    newComment.comment = comment;

    try {
      const diContainer = new WebDIContainer();
      const commentService = diContainer.getCommentService();
      await commentService.create(newComment);
      notifySuccess('Comentário criado com sucesso!');
    } catch (error: any) {
      notifyError('Falha ao criar comentário');
    }
  }

  function clearFields() {
    const nameInput = nameRef.current;
    const emailInput = emailRef.current;
    const commentTextArea = commentRef.current;

    if (nameInput && emailInput && commentTextArea) {
      nameInput.value = '';
      emailInput.value = '';
      commentTextArea.value = '';
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nameInput = nameRef.current;
    const emailInput = emailRef.current;
    const commentTextArea = commentRef.current;

    validateAllInputs([nameInput, emailInput]);
    validateTextArea(commentTextArea);

    await createComment();

    clearFields();
  };

  function renderButtons() {
    return (
      <AuthenticationButtons
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
    );
  }

  return (
    <div className={styles.container}>
      <ButtonsHeader headerType={'primary'} renderButtons={renderButtons} />

      <FlexWrapper className={styles.flexWrapper} orientation={'column'}>
        <FlexWrapper className={styles.presentation} orientation={'column'}>
          <FlexWrapper className={styles.box} orientation={'column'}>
            <h2>Contato</h2>
            <h3>Olá, querido visitante</h3>

            <p>
              Sinta-se livre para deixar uma mensagem sobre: dicas de como
              melhorar o site, ou mande seu livro, poema, ou qualquer outra
              razão.
            </p>
          </FlexWrapper>

          <form
            action="#"
            className={styles.form}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <FlexWrapper className={styles.name} orientation={'column'}>
              <Label text={'Seu nome'} />
              <Input type={'text'} name={'nome'} ref={nameRef} />
            </FlexWrapper>

            <FlexWrapper className={styles.email} orientation={'column'}>
              <Label text={'Seu melhor email'} />
              <Input type={'email'} name={'email'} ref={emailRef} />
            </FlexWrapper>

            <FlexWrapper className={styles.comment} orientation={'column'}>
              <Label text={'Comentário'} />
              <TextArea
                id={'commentTextArea'}
                cols={30}
                rows={10}
                name={'comentário'}
                ref={commentRef}
              ></TextArea>
            </FlexWrapper>

            <Button type="submit" btnType="secondary">
              Enviar
            </Button>
          </form>
        </FlexWrapper>
      </FlexWrapper>
    </div>
  );
}

export default CommentsPage;
