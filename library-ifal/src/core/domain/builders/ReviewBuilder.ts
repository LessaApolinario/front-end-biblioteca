import Review from '../models/Review';

class ReviewBuilder {
  private _id?: string;
  private user_id?: string;
  private name?: string;
  private title_book?: string;
  private writer?: string;
  private review?: string;
  private available?: boolean;
  private updated_at?: string;
  private created_at?: string;

  constructor(name?: string){
    this.name = name;
  }

  public withID(_id?: string): ReviewBuilder {
    this._id = _id;
    return this;
  }

  public withUserID(user_id?: string): ReviewBuilder {
    this.user_id = user_id;
    return this;
  }

  public withTitleBook(title_book?: string): ReviewBuilder {
    this.title_book = title_book;
    return this;
  }

  public withWriter(writer?: string): ReviewBuilder {
    this.writer = writer;
    return this;
  }

  public withReview(review?: string): ReviewBuilder {
    this.review = review;
    return this;
  }

  public withAvailable(available?: boolean): ReviewBuilder {
    this.available = available;
    return this;
  }

  public withUpdatedAt(updated_at?: string): ReviewBuilder {
    this.updated_at = updated_at;
    return this;
  }

  public withCreatedAt(created_at?: string): ReviewBuilder {
    this.created_at = created_at;
    return this;
  }

  public build(): Review {
    const json: Record<string, unknown> = {
      id: this._id,
      user_id: this.user_id,
      name: this.name,
      title_book: this.title_book,
      writer: this.writer,
      review: this.review,
      available: this.available,
      updated_at: this.updated_at,
      created_at: this.created_at,
    };
    return Review.fromJSON(json);
  }
}

export default ReviewBuilder;
