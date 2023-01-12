import Book from '../../domain/models/Book';

abstract class BookAdapter {
  abstract fetch(): Promise<Book[]>;
  abstract search(query: string): Promise<Book[]>;
}

export default BookAdapter;
