class Book {
  _id?: string;
  titulo?: string;
  autor?: string;
  edicao?: string;
  ano?: string;
  localizacao?: string;

  static fromJSON(json: Record<string, unknown>): Book {
    const book = new Book();
    book._id = String(json['_id']);
    book.titulo = String(json['titulo']);
    book.autor = String(json['autor']);
    book.edicao = String(json['edicao']);
    book.ano = String(json['ano']);
    book.localizacao = String(json['localizacao']);
    return book;
  }

  toJSON(): Record<string, unknown> {
    const json: Record<string, unknown> = {};
    json['titulo'] = this.titulo;
    json['autor'] = this.autor;
    json['edicao'] = this.edicao;
    json['ano'] = this.ano;
    json['localizacao'] = this.localizacao;
    return json;
  }
}

export default Book;
