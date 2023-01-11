import Book from '../../../core/domain/models/Book';
import { DTO } from '../../../core/domain/types/DTO';
import BookAdapter from '../../../core/interfaces/adapter/BookAdapter';
import { APIClient } from '../clients/APIClient';

class BookAPI extends BookAdapter {
  async fetch(): Promise<Book[]> {
    const response = await APIClient.get<DTO[]>('/books');
    return response.data.map(Book.fromJSON);
  }

  async search(query: string): Promise<Book[]> {
    const response = await APIClient.get<DTO[]>(`/books/search?s=${query}`);
    return response.data.map(Book.fromJSON);
  }
}

export default BookAPI;
