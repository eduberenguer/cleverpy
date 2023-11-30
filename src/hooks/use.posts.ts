import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { PostsRepository } from '../services/posts.repository';
import { postsActions } from '../redux/posts.slice';
import { createPostAsync, getPostsAsync } from '../redux/posts.thunks';
import { API_URL } from '../config';
import { Post } from '../models/post.model';

export function usePosts() {
  const repo = useMemo(() => new PostsRepository(API_URL), []);

  const { posts, postsState } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  const loadPosts = useCallback(
    async (filter?: string) => {
      await dispatch(getPostsAsync({ repo, filter }));
    },
    [repo, dispatch]
  );

  const deletePost = async (id: Post['id']) => {
    (await repo.delete(id)) && dispatch(postsActions.deletePost(id));
  };

  const createPost = async (post: Omit<Post, 'id'>) => {
    await dispatch(createPostAsync({ repo, post }));
  };

  return {
    loadPosts,
    posts,
    postsState,
    deletePost,
    createPost,
  };
}
