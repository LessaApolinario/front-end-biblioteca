import { createContext, ReactNode, useState } from "react";

import ReviewDTO from "../../core/dto/ReviewDTO";
import Review from "../../core/models/Review";

import api from "../../services/api";

interface ReviewsCTXProps {
  data: undefined | Review[]
  fetch(): Promise<ReviewDTO[]>
  add(review: Review): Promise<void>
}

interface ReviewsProviderProps {
  children: ReactNode
}

export const ReviewsCTX = createContext({} as ReviewsCTXProps)

function ReviewsProvider({ children }: ReviewsProviderProps) {
  const [data, setData] = useState<Review[]>()

  const fetch = async () => {
    const { data } = await api.get<ReviewDTO[]>('/api/reviews')
    
    setData(data)
    
    return data
  }

  const add = async (review: Review) => {
    await api.post('/api/reviews', JSON.stringify(review), {
      headers: {
        'Content-type': 'application/json'
      }
    })

    setData((previousState) => [
      review,
      ...previousState as Review[]
    ])
  }

  return (
    <ReviewsCTX.Provider value={{ data, fetch, add }}>
      {children}
    </ReviewsCTX.Provider>
  )
}

export default ReviewsProvider
