import Book from '../../domain/models/Book';
import BookAdapter from '../adapter/BookAdapter';

abstract class IBookService {
  constructor(protected readonly adapter: BookAdapter) {}

  abstract fetch(): Promise<Book[]>;
  abstract search(query: string): Promise<Book[]>;
}

export default IBookService;
