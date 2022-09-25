import Book from '../../domain/models/Book'

abstract class IBookService {
  abstract fetch(): Promise<Book[]>
  abstract search(query: string): Promise<Book[]>
}

export default IBookService
