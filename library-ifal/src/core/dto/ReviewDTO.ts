import BookDTO from "./BookDTO"

interface ReviewDTO  {
  username: string
  book: BookDTO
  review: string
}

export default ReviewDTO
