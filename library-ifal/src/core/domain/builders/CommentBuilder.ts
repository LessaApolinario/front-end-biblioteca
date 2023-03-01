import Comment from '../models/Comment';

class CommentBuilder {
  private name?: string;
  private email?: string;
  private comment?: string;

  constructor(name?: string) {
    this.name = name;
  }

  public withEmail(email?: string): CommentBuilder {
    this.email = email;
    return this;
  }

  public withComment(comment?: string): CommentBuilder {
    this.comment = comment;
    return this;
  }

  public build(): Comment {
    return Comment.fromJSON({
      name: this.name,
      email: this.email,
      comment: this.comment,
    });
  }
}

export default CommentBuilder;
