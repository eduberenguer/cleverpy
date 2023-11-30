import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user.model';
import { getUsersAsync } from './users.thunks';
import { LoginResponse } from '../types/loginResponse';

export type UsersState = {
  currentUser: User | null;
  token: string;
  users: User[];
  usersState: 'loaded' | 'idle' | 'error';
  hasLoginError: boolean;
};

const initialState: UsersState = {
  currentUser: null,
  token: '',
  users: [],
  usersState: 'idle',
  hasLoginError: false,
};

const usersSlice = createSlice({
  initialState: initialState,
  name: 'users',
  reducers: {
    loginUser: (
      state: UsersState,
      { payload: { currentUser, token } }: PayloadAction<LoginResponse>
    ) => ({
      ...state,
      currentUser: currentUser,
      token: token,
    }),

    loginError: (state: UsersState) => ({
      ...state,
      hasLoginError: true,
    }),

    logoutUser: (state: UsersState) => ({
      ...state,
      currentUser: null,
      token: '',
    }),
  },

  extraReducers: (builder) => {
    builder.addCase(
      getUsersAsync.fulfilled,
      (state, { payload }: { payload: User[] }) => {
        state.usersState = 'loaded';
        state.users = payload;
      }
    );
    builder.addCase(getUsersAsync.pending, (state) => {
      state.usersState = 'idle';
    });
    builder.addCase(getUsersAsync.rejected, (state) => {
      state.usersState = 'error';
    });
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
