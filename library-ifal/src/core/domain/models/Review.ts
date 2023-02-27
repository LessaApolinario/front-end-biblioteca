class Review {
  _id?: string;
  user_id?: string;
  name?: string;
  title_book?: string;
  writer?: string;
  review?: string;
  available?: boolean;
  updated_at?: string;
  created_at?: string;

  static fromJSON(json: Record<string, unknown>): Review {
    const review = new Review();
    review._id = String(json['id']);
    review.user_id = String(json['user_id']);
    review.name = String(json['name']);
    review.title_book = String(json['title_book']);
    review.writer = String(json['writer']);
    review.review = String(json['review']);
    review.available = Boolean(json['available']);
    review.updated_at = String(json['updated_at']);
    review.created_at = String(json['created_at']);
    return review;
  }

  toJSON(): Record<string, unknown> {
    const json: Record<string, unknown> = {};
    json['_id'] = this._id;
    json['user_id'] = this.user_id;
    json['name'] = this.name;
    json['title_book'] = this.title_book;
    json['writer'] = this.writer;
    json['review'] = this.review;
    json['available'] = this.available;
    json['updated_at'] = this.updated_at;
    json['created_at'] = this.created_at;
    return json;
  }
}

export default Review;
