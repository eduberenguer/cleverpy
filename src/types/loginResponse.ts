import { User } from '../models/user.model';

export type LoginResponse = {
  token: string;
  currentUser: User;
};
