import Book from '../../domain/models/Book'
import IAPI from './IAPI'

abstract class IBookAPI extends IAPI {
  abstract fetch(): Promise<Book[]>
  abstract search(query: string): Promise<Book[]>
}

export default IBookAPI
