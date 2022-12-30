import Post from '../models/Post'

class PostBuilder {
  private user_name?: string
  private title?: string
  private content?: string
  private user_id?: string
  private created_at?: string
  private updated_at?: string

  constructor(user_name?: string) {
    this.user_name = user_name
  }

  public withTitle(title?: string): PostBuilder {
    this.title = title
    return this
  }

  public withContent(content?: string): PostBuilder {
    this.content = content
    return this
  }

  public withUser(user_id?: string): PostBuilder {
    this.user_id = user_id
    return this
  }

  public withCreatedAt(created_at?: string): PostBuilder {
    this.created_at = created_at
    return this
  }

  public withUpdatedAt(updated_at?: string): PostBuilder {
    this.updated_at = updated_at
    return this
  }

  public build(): Post {
    return Post.fromJSON({
      "user_name": this.user_name,
      "title": this.title,
      "content": this.content,
      "user_id": this.user_id,
      "created_at": this.created_at,
      "updated_at": this.updated_at
    })
  }
}

export default PostBuilder
