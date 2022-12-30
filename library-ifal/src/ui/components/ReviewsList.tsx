import { ReactNode } from 'react'

import Review from '../../core/domain/models/Review'

import FlexWrapper from './FlexWrapper'

import styles from '../styles/components/ReviewsList.module.scss'

interface ReviewsListProps {
  data: Review[] | undefined
  renderItem(item: Review): ReactNode
}

function ReviewsList(props: ReviewsListProps) {
  return (
    <FlexWrapper className={styles.container} orientation={'row'}>
      {props.data?.map((item) => (props.renderItem(item)))}
    </FlexWrapper>
  )
}

export default ReviewsList
