import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostsRepository } from '../services/posts.repository';
import { Post } from '../models/post.model';

export const getPostsAsync = createAsyncThunk<
  Post[],
  { repo: PostsRepository; filter?: string }
>('posts/load', async ({ repo, filter }) => {
  const posts = await repo.getAll(filter);
  return posts;
});

export const createPostAsync = createAsyncThunk<
  Post,
  { repo: PostsRepository; post: Omit<Post, 'id'> }
>('posts/create', async ({ repo, post }) => {
  return await repo.create(post);
});
