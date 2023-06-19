import { createRef } from 'react';
import PostBuilder from '../../../../../../core/domain/builders/PostBuilder';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useNotifications } from '../../../../../../hooks/useNotifications';
import { usePosts } from '../../../../../../hooks/usePosts';
import Flex from '../../../../../components/Flex';
import Form from '../../../../../components/Form';
import Input from '../../../../../components/Input';
import Label from '../../../../../components/Label';
import TextArea from '../../../../../components/TextArea';
import { Button } from '../../../../components/base/Button';
import styles from './styles.module.scss';

interface Props {
  isVisible: boolean;
}

function CreatePostForm({ isVisible }: Props) {
  const titleRef = createRef<HTMLInputElement>();
  const contentRef = createRef<HTMLTextAreaElement>();
  const { getUser } = useAuth();
  const { user } = getUser();
  const { notifyError } = useNotifications();
  const { create } = usePosts();

  async function handleCreatePost() {
    try {
      await create(buildPost());
    } catch (error: any) {
      notifyError(error.message);
    }
  }

  function buildPost() {
    return new PostBuilder(user?.name)
      .withTitle(titleRef.current?.value)
      .withContent(contentRef.current?.value)
      .build();
  }

  if (!isVisible) {
    return <></>;
  }

  return (
    <Form
      className={styles.container}
      orientation={'column'}
      handleSubmit={handleCreatePost}
    >
      <Flex className={styles.postTitle} orientation={'column'}>
        <Label text={'Título do post'} />
        <Input type={'text'} name={'título'} ref={titleRef} />
      </Flex>

      <Flex className={styles.postContent} orientation={'column'}>
        <Label text={'Conteúdo do post'} />
        <TextArea
          name={'conteúdo'}
          id={'postTextArea'}
          cols={30}
          rows={10}
          ref={contentRef}
        ></TextArea>
      </Flex>

      <Button color="yellow">Publicar post</Button>
    </Form>
  );
}

export { CreatePostForm };
