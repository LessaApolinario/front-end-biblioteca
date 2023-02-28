import User from '../models/User';

class UserBuilder {
  private id?: string;
  private name?: string;
  private username?: string;
  private email?: string;
  private password?: string;
  private access_token?: string;
  private token_type?: 'bearer';
  private expires_in?: number;

  constructor(name?: string) {
    this.name = name;
  }

  public withId(id?: string): UserBuilder {
    this.id = id;
    return this;
  }

  public withUsername(username?: string): UserBuilder {
    this.username = username;
    return this;
  }

  public withEmail(email?: string): UserBuilder {
    this.email = email;
    return this;
  }

  public withPassword(password?: string): UserBuilder {
    this.password = password;
    return this;
  }

  public withAccessToken(access_token?: string): UserBuilder {
    this.access_token = access_token;
    return this;
  }

  public withExpiresIn(expires_in?: number): UserBuilder {
    this.expires_in = expires_in;
    return this;
  }

  public build(): User {
    return User.fromJSON({
      id: this.id,
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      access_token: this.access_token,
      token_type: this.token_type,
      expires_in: this.expires_in,
    });
  }
}

export default UserBuilder;
