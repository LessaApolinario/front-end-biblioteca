import User from '../../../core/domain/models/User';
import AuthCredentialsDTO from '../../../core/domain/types/AuthCredentialsDTO';
import { DTO } from '../../../core/domain/types/DTO';
import UserAdapter from '../../../core/interfaces/adapter/UserAdapter';
import { APIClient } from '../clients/APIClient';

class UserAPI extends UserAdapter {
  async login(credentials: AuthCredentialsDTO): Promise<User> {
    const response = await APIClient.post<DTO>(
      '/api/auth/login',
      JSON.stringify(credentials),
      { headers: { 'Content-Type': 'application/json' } }
    );
    return User.fromJSON(response.data);
  }

  async logout(id: string, token: string): Promise<void> {
    await APIClient.post('/api/auth/logout', JSON.stringify({ id, token }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async register(user: User): Promise<void> {
    await APIClient.post('/api/auth/register', JSON.stringify(user.toJSON()), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  refreshSession(storedToken: string): void {
    APIClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${storedToken}`;
  }

  destroySession(): void {
    APIClient.defaults.headers.common['Authorization'] = '';
  }
}

export default UserAPI;
