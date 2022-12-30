import { ReactNode } from 'react'

import Post from '../../core/domain/models/Post'

import FlexWrapper from './FlexWrapper'

import styles from '../styles/components/PostsList.module.scss'

interface PostsListProps {
  data: Post[] | undefined
  renderItem(item: Post): ReactNode
}

function PostsList(props: PostsListProps) {
  return (
    <FlexWrapper className={styles.container} orientation={'column'}>
      {props.data?.map(item => (props.renderItem(item)))}
    </FlexWrapper>
  )
}

export default PostsList
