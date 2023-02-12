import { ReactNode, createRef, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { usePosts } from '../../hooks/usePosts';

import Button from './Button';
import Flex from './Flex';
import Form from './Form';
import Input from './Input';
import ItemsList from './ItemsList';
import Label from './Label';
import OpenCloseButton from './OpenCloseButton';
import PostComponent from './PostComponent';
import TextArea from './TextArea';

import Post from '../../core/domain/models/Post';

import PostBuilder from '../../core/domain/builders/PostBuilder';

import styles from '../styles/components/PostsArea.module.scss';
import createPostFormStyles from '../styles/components/CreatePostForm.module.scss';

function PostsArea() {
  const titleRef = createRef<HTMLInputElement>();
  const contentRef = createRef<HTMLTextAreaElement>();
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const { notifyError } = useNotifications();
  const { data, createPost } = usePosts();

  function renderItem(item: Post): ReactNode {
    return <PostComponent data={item} key={item.created_at} />;
  }

  function buildPost() {
    return new PostBuilder(user?.name)
      .withTitle(titleRef.current?.value)
      .withContent(contentRef.current?.value)
      .build();
  }

  async function handleCreatePost() {
    const post = buildPost();

    try {
      await createPost(post);
    } catch (error: any) {
      notifyError(error.message);
    }
  }

  function RenderPostsForm() {
    if (!!isVisible) {
      return (
        <Form
          className={createPostFormStyles.container}
          orientation={'column'}
          handleSubmit={handleCreatePost}
        >
          <Flex
            className={createPostFormStyles.postTitle}
            orientation={'column'}
          >
            <Label text={'Título do post'} />
            <Input type={'text'} name={'título'} ref={titleRef} />
          </Flex>

          <Flex
            className={createPostFormStyles.postContent}
            orientation={'column'}
          >
            <Label text={'Conteúdo do post'} />
            <TextArea
              name={'conteúdo'}
              id={'postTextArea'}
              cols={30}
              rows={10}
              ref={contentRef}
            ></TextArea>
          </Flex>

          <Button type="submit" btnType="secondary">
            Publicar post
          </Button>
        </Form>
      );
    }

    return null;
  }

  return (
    <div className={styles.container}>
      <h3>Área de posts</h3>

      <div className={styles.posts}>
        <OpenCloseButton
          className={'primary'}
          closeText={'Fechar'}
          addItemText={'Adicionar post'}
          isVisible={isVisible}
          onClick={() => setIsVisible(!isVisible)}
        />

        <RenderPostsForm />

        <ItemsList<Post>
          data={data}
          orientation={'column'}
          renderItem={renderItem}
        />
      </div>
    </div>
  );
}

export default PostsArea;
