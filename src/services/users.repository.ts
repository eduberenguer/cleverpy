import { User } from '../models/user.model';
import { LoginCredentials } from '../types/loginCredentials';
import { LoginResponse } from '../types/loginResponse';
import { Repository } from './repository';

export class UsersRepository implements Repository<User> {
  constructor(public url: string) {
    this.url += 'users';
  }

  async getAll(): Promise<User[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const answer = (await response.json()) as User[];
    return answer;
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const users = await this.getAll();
    const currentUser = users.find(
      (item) => item.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (!currentUser || !currentUser.username) {
      throw new Error('Invalid credentials');
    }

    if (
      currentUser.username.toLowerCase() !== credentials.password.toLowerCase()
    ) {
      throw new Error('Invalid credentials');
    }

    return {
      currentUser,
      token: 'Fake token example',
    };
  }
}
