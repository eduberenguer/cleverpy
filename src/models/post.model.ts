import { User } from './user.model';

export type Post = {
  id: number;
  userId: User['id'];
  title: string;
  body: string;
};
