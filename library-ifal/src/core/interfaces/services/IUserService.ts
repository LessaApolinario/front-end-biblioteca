import User from '../../domain/models/User';
import AuthCredentialsDTO from '../../domain/types/AuthCredentialsDTO';
import UserAdapter from '../adapter/UserAdapter';

abstract class IUserService {
  constructor(protected readonly adapter: UserAdapter) {}

  abstract login(credentials: AuthCredentialsDTO): Promise<User>;
  abstract logout(id: string, token: string): Promise<void>;
  abstract register(user: User): Promise<void>;
  abstract refreshSession(storedToken: string): void;
  abstract destroySession(): void;
}

export default IUserService;
