import { Post } from './post.model';
import { User } from './user.model';

export type Comment = {
  postId: Post['id'];
  id: number;
  name: User['name'];
  email: User['email'];
  body: string;
};
