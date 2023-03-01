import { ReactNode, useState } from 'react';

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

import styles from '../styles/components/PostsArea.module.scss';
import createPostFormStyles from '../styles/components/CreatePostForm.module.scss';

function PostsArea() {
  const { data, handleCreatePost, refs } = usePosts();
  const { titleRef, contentRef } = refs;
  const [isVisible, setIsVisible] = useState(false);

  function renderItem(item: Post): ReactNode {
    return <PostComponent data={item} key={item.created_at} />;
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
