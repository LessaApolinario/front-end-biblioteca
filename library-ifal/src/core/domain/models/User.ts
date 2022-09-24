class User {
  id?: string
  name?: string
  access_token?: string
  token_type?: 'bearer'
  expires_in?: number

  static fromJSON(json: Record<string, unknown>): User {
    const user = new User()
    user.id = String(json['id'])
    user.name = String(json['name'])
    user.access_token = String(json['access_token'])
    user.token_type = 'bearer'
    user.expires_in = Number(json['expires_in'])
    return user
  }

  toJSON(): Record<string, unknown> {
    const json: Record<string, unknown> = {}
    json["id"] = this.id
    json["name"] = this.name
    json["access_token"] = this.access_token
    json["token_type"] = this.token_type
    json["expires_in"] = this.expires_in
    return json
  }
}

export default User
