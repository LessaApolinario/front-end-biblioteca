import { createContext, ReactNode, useState } from "react"

import Review from "../../core/domain/models/Review"
import ReviewService from "../../services/ReviewService"

interface ReviewsCTXProps {
  data: undefined | Review[]
  fetch(): Promise<Review[]>
  create(review: Review): Promise<Review>
}

interface ReviewsProviderProps {
  children: ReactNode
}

export const ReviewsCTX = createContext({} as ReviewsCTXProps)

function ReviewsProvider({ children }: ReviewsProviderProps) {
  const [data, setData] = useState<Review[]>()

  const fetch = async () => {
    const reviewService = new ReviewService()
    const reviews = await reviewService.fetch()
    
    setData(reviews)
    
    return reviews
  }

  const create = async (review: Review) => {
    const reviewService = new ReviewService()
    await reviewService.create(review)

    setData((previousState) => [
      review,
      ...previousState as Review[]
    ])

    return review
  }

  return (
    <ReviewsCTX.Provider value={{ data, fetch, create }}>
      {children}
    </ReviewsCTX.Provider>
  )
}

export default ReviewsProvider
