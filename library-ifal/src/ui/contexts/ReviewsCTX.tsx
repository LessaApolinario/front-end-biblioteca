import { createContext, ReactNode, useState } from "react"

import Review from "../../core/domain/models/Review"
import ReviewService from "../../services/ReviewService"

interface ReviewsCTXProps {
  data: undefined | Review[]
  fetch(): Promise<Review[]>
  create(
    user_id: string,
    name: string,
    title_book: string,
    writer: string,
    review: string,
    available: boolean
  ): Promise<Review>
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

  const create = async (
    user_id: string,
    name: string,
    title_book: string,
    writer: string,
    review: string,
    available: boolean
  ) => {
    const reviewService = new ReviewService()
    const data = await reviewService.create(user_id, name, title_book, writer, review, available)

    setData((previousState) => [
      data as Review,
      ...previousState as Review[]
    ])

    return data
  }

  return (
    <ReviewsCTX.Provider value={{ data, fetch, create }}>
      {children}
    </ReviewsCTX.Provider>
  )
}

export default ReviewsProvider
