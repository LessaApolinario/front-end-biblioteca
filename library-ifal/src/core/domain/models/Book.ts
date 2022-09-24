class Book {
  title?: string
  author?: string
  edition?: string
  year?: string
  localization?: string

  static fromJSON(json: Record<string, unknown>): Book {
    const book = new Book()
    book.title = String(json["title"])
    book.author = String(json["author"])
    book.edition = String(json["edition"])
    book.year = String(json["year"])
    book.localization = String(json["localization"])
    return book
  }

  toJSON(): Record<string, unknown> {
    const json: Record<string, unknown> = {}
    json["title"] = this.title
    json["author"] = this.author
    json["edition"] = this.edition
    json["year"] = this.year
    json["localization"] = this.localization
    return json
  }
}

export default Book
