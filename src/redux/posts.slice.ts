import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../models/post.model';
import { createPostAsync, getPostsAsync } from './posts.thunks';

export type PostsState = {
  posts: Post[];
  postsState: 'idle' | 'loaded' | 'error';
};

const initialState: PostsState = {
  posts: [],
  postsState: 'idle',
};
const postsSlice = createSlice({
  initialState: initialState,
  name: 'posts',
  reducers: {
    deletePost: (state, action: PayloadAction<Post['id']>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getPostsAsync.fulfilled,
      (state, { payload }: { payload: Post[] }) => {
        state.postsState = 'loaded';
        state.posts = payload;
      }
    );
    builder.addCase(getPostsAsync.pending, (state) => {
      state.postsState = 'idle';
    });
    builder.addCase(getPostsAsync.rejected, (state) => {
      state.postsState = 'error';
    });
    builder.addCase(createPostAsync.fulfilled, (state, { payload }) => ({
      ...state,
      posts: [payload, ...state.posts],
    }));
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
