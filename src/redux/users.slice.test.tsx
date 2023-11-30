import { waitFor } from '@testing-library/react';
import { UsersRepository } from '../services/users.repository';
import { store } from '../store/store';
import { getUsersAsync } from './users.thunks';

describe('Given the usersSlice reducer', () => {
  describe('When the createSlice function is called', () => {
    test('Then it should get to the fulfilled case of the getUsersAsync thunk', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ];

      const mockRepo = {
        getAll: jest.fn().mockResolvedValue(mockUsers),
      } as unknown as UsersRepository;

      await store.dispatch(getUsersAsync(mockRepo));

      await waitFor(() => {
        expect(store.getState().users.usersState).toBe('loaded');
      });
    });
  });
});
