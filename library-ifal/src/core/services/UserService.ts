import User from '../domain/models/User';
import AuthCredentialsDTO from '../domain/types/AuthCredentialsDTO';
import IUserService from '../interfaces/services/IUserService';

class UserService extends IUserService {
  login(credentials: AuthCredentialsDTO): Promise<User> {
    return this.adapter.login(credentials);
  }

  logout(id: string, token: string): Promise<void> {
    return this.adapter.logout(id, token);
  }

  register(user: User): Promise<void> {
    return this.adapter.register(user);
  }

  refreshSession(storedToken: string): void {
    this.adapter.refreshSession(storedToken);
  }

  destroySession(): void {
    this.adapter.destroySession();
  }
}

export default UserService;
