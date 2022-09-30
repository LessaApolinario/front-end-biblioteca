import BookAPI from '../api/BookAPI'
import Book from '../core/domain/models/Book'
import IBookService from '../core/interfaces/services/IBookService'

class BookService extends IBookService {
  fetch(): Promise<Book[]> {
    return await new BookAPI().fetch()
  }

  search(query: string): Promise<Book[]> {
    return await new BookAPI().search(query)
  }
}

export default BookService
