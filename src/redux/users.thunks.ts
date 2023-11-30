import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersRepository } from '../services/users.repository';
import { User } from '../models/user.model';

export const getUsersAsync = createAsyncThunk<User[], UsersRepository>(
  'users/load',
  async (repo) => {
    const users = await repo.getAll();
    return users;
  }
);
