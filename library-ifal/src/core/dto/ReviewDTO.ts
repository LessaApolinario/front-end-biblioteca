interface ReviewDTO {
  _id?: string
  user_id?: string
  name?: string
  title_book: string
  writer: string
  review: string
  available?: boolean
  updated_at?: string
  created_at?: string
}

export default ReviewDTO
