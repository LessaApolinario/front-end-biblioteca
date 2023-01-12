import { createRef } from 'react';

import Button from './Button';
import FlexWrapper from './FlexWrapper';
import Input from './Input';
import Label from './Label';
import TextArea from './TextArea';

import styles from '../styles/components/CreatePostForm.module.scss';

interface CreatePostFormProps {
  isVisible: boolean;
  handleCreatePost(
    titleRef: React.RefObject<HTMLInputElement>,
    contentRef: React.RefObject<HTMLTextAreaElement>
  ): Promise<void>;
}

function CreatePostForm(props: CreatePostFormProps) {
  const titleRef = createRef<HTMLInputElement>();
  const contentRef = createRef<HTMLTextAreaElement>();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    await props.handleCreatePost(titleRef, contentRef);
  }

  if (!props.isVisible) {
    return <></>;
  }

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <FlexWrapper className={styles.postTitle} orientation={'column'}>
        <Label text={'Título do post'} />
        <Input type={'text'} name={'título'} ref={titleRef} />
      </FlexWrapper>

      <FlexWrapper className={styles.postContent} orientation={'column'}>
        <Label text={'Conteúdo do post'} />
        <TextArea
          name={'conteúdo'}
          id={'postTextArea'}
          cols={30}
          rows={10}
          ref={contentRef}
        ></TextArea>
      </FlexWrapper>

      <Button type="submit" btnType="secondary">
        Publicar post
      </Button>
    </form>
  );
}

export default CreatePostForm;
