import '@testing-library/jest-dom';
import { useUsers } from './use.users';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { store } from '../store/store';
import { usersActions } from '../redux/users.slice';
import { LoginResponse } from '../types/loginResponse';
import { LoginCredentials } from '../types/loginCredentials';
import { UsersRepository } from '../services/users.repository';
import { getUsersAsync } from '../redux/users.thunks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

const mockUserLogin = {
  token: 'mytoken',
  currentUser: { email: 'sergio@email.com' },
} as unknown as LoginResponse;

const mockUserCredentials = {
  email: 'sergio@email.com',
} as unknown as LoginCredentials;

const mockRepo = {
  login: jest.fn(),
} as unknown as UsersRepository;

UsersRepository.prototype.login = jest.fn();

function TestComponent() {
  const { loginUser, logoutUser, loadUsers } = useUsers();

  return (
    <>
      <button onClick={() => loginUser(mockUserCredentials)}></button>
      <button onClick={() => logoutUser()}></button>
      <button onClick={() => loadUsers()}></button>
    </>
  );
}

describe('Given the useUsers custom hook', () => {
  let elements: HTMLElement[];

  beforeEach(async () => {
    await act(async () => {
      render(
        <Router>
          <Provider store={store}>
            <TestComponent></TestComponent>
          </Provider>
        </Router>
      );
    });
    elements = screen.getAllByRole('button');
  });

  describe('When is rendered', () => {
    test('Then the loginUser function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[0]);
        expect(UsersRepository.prototype.login).toHaveBeenCalled();
        store.dispatch(usersActions.loginUser(mockUserLogin));
      });
    });

    test('Then the logoutUser function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[1]);
        store.dispatch(usersActions.logoutUser());
      });
    });

    test('Then the loadUsers function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[2]);
        store.dispatch(getUsersAsync(mockRepo));
      });
    });
  });
});
