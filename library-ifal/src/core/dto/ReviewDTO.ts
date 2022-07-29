import User from "../models/User"

import BookDTO from "./BookDTO"

interface ReviewDTO  {
  user: User
  book: BookDTO
  review: string
}

export default ReviewDTO
