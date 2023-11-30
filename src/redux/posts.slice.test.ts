import { waitFor } from '@testing-library/react';
import { PostsRepository } from '../services/posts.repository';
import { store } from '../store/store';
import { createPostAsync, getPostsAsync } from './posts.thunks';
import { Post } from '../models/post.model';

describe('Given the postsSlice reducer', () => {
  describe('When the createSlice function is called', () => {
    test('Then it should get to the fulfilled case of the getPostsAsync thunk', async () => {
      const mockPosts = [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ];

      const mockRepo = {
        getAll: jest.fn().mockResolvedValue(mockPosts),
      } as unknown as PostsRepository;

      await store.dispatch(getPostsAsync({ repo: mockRepo }));

      await waitFor(() => {
        expect(store.getState().posts.postsState).toBe('loaded');
      });
    });
    test('Then it should get to the rejected case of the getPostsAsync thunk', async () => {
      const mockError = new Error('Error fetching posts');
      const mockRepo = {
        getAll: jest.fn().mockRejectedValue(mockError),
      } as unknown as PostsRepository;

      await store.dispatch(getPostsAsync({ repo: mockRepo }));

      await waitFor(() => {
        expect(store.getState().posts.postsState).toBe('error');
      });
    });
  });
  describe('When the createSlice function is called', () => {
    test('Then it should get to the fulfilled case of the createPostAsync thunk', async () => {
      const mockNewPost = { id: '3', title: 'New Post' } as unknown as Post;

      const mockRepo = {
        create: jest.fn().mockResolvedValue(mockNewPost),
      } as unknown as PostsRepository;

      await store.dispatch(
        createPostAsync({ repo: mockRepo, post: mockNewPost })
      );

      await waitFor(() => {
        expect(store.getState().posts.posts).toHaveLength(3);
        expect(store.getState().posts.posts[0]).toEqual(mockNewPost);
      });
    });
  });
});
