class Book {
  _id?: string
  titulo?: string
  autor?: string
  edicao?: string
  ano?: string
  localizacao?: string

  static fromJSON(json: Record<string, unknown>): Book {
    const book = new Book()
    book._id = json["_id"] === undefined ? "-" : String(json["_id"])
    book.titulo = json["titulo"] === undefined ? '-' : String(json["titulo"])
    book.autor = json["autor"] === undefined ? '-' : String(json["autor"])
    book.edicao = json["edicao"] === undefined ? '-' : String(json["edicao"])
    book.ano = json["ano"] === undefined ? '-' : String(json["ano"])
    book.localizacao = json["localizacao"] === undefined ? '-' : String(json["localizacao"])
    return book
  }

  toJSON(): Record<string, unknown> {
    const json: Record<string, unknown> = {}
    json["titulo"] = this.titulo
    json["autor"] = this.autor
    json["edicao"] = this.edicao
    json["ano"] = this.ano
    json["localizacao"] = this.localizacao
    return json
  }
}

export default Book
