import { Post } from '../models/post.model';
import { Repository } from './repository';

export class PostsRepository implements Repository<Post> {
  constructor(public url: string) {
    this.url += 'posts';
  }

  async getAll(filter?: string): Promise<Post[]> {
    let filteredUrl = this.url;

    if (filter) {
      filteredUrl = this.url + `?userId=${filter}`;
    }

    const response = await fetch(filteredUrl);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const answer = (await response.json()) as Post[];
    return answer;
  }

  async create(item: Omit<Post, 'id'>): Promise<Post> {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async delete(id: Post['id']): Promise<boolean> {
    const response = await fetch(this.url + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  }
}
