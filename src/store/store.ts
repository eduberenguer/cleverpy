import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import postsReducer from '../redux/posts.slice';
import usersReducer from '../redux/users.slice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
