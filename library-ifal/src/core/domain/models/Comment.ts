class Comment {
  _id?: string
  name?: string
  email?: string
  comment?: string

  static fromJSON(json: Record<string, unknown>): Comment {
    const comment = new Comment()
    comment._id = String(json["_id"])
    comment.name = String(json["name"])
    comment.email = String(json["email"])
    comment.comment = String(json["comment"])
    return comment
  }

  toJSON(): Record<string, unknown> {
    const json: Record<string, unknown> = {}
    json["_id"] = this._id
    json["_name"] = this.name
    json["_email"] = this.email
    json["_comment"] = this.comment
    return json
  }
}

export default Comment
