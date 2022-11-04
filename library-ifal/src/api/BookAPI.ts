import Book from '../core/domain/models/Book'
import IBookAPI from '../core/interfaces/api/IBookAPI'

class BookAPI extends IBookAPI {
  async fetch(): Promise<Book[]> {
    const response = await this.client.get('/books')
    const books: Book[] = response.data.map((item: Record<string, unknown>) => {
      return Book.fromJSON(item)
    })

    return books
  }

  async search(query: string): Promise<Book[]> {
    const response = await this.client.get(`/books/search?s=${query}`)
    const books: Book[] = response.data.map((item: Record<string, unknown>) => {
      return Book.fromJSON(item)
    })

    return books
  }
}

export default BookAPI
