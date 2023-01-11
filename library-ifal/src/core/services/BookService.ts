import Book from '../domain/models/Book';
import IBookService from '../interfaces/services/IBookService';

class BookService extends IBookService {
  fetch(): Promise<Book[]> {
    return this.adapter.fetch();
  }

  search(query: string): Promise<Book[]> {
    return this.adapter.search(query);
  }
}

export default BookService;
