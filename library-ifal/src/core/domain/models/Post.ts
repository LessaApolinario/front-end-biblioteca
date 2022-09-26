class Post {
  user_name?: string
  title?: string
  content?: string
  user_id?: string
  created_at?: string
  updated_at?: string

  static fromJSON(json: Record<string, unknown>): Post {
    const post = new Post()
    post.user_name = String(json["user_name"])
    post.title = String(json["title"])
    post.content = String(json["content"])
    post.user_id = String(json["user_id"])
    post.created_at = String(json["created_at"])
    post.updated_at = String(json["updated_at"])
    return post
  }

  toJSON(): Record<string, unknown> {
    const json: Record<string, unknown> = {}
    json["user_name"] = this.user_name
    json["title"] = this.title
    json["content"] = this.content
    json["user_id"] = this.user_id
    json["created_at"] = this.created_at
    json["updated_at"] = this.updated_at
    return json
  }
}

export default Post
