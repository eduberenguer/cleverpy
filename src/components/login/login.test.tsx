import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import { store } from '../../store/store';
import Login from './login';
import { useUsers } from '../../hooks/use.users';

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    loginUser: jest.fn(),
    loadUsers: jest.fn(),
  }),
}));

const mockOberserve = () => {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
};

window.IntersectionObserver = jest.fn().mockImplementation(mockOberserve);

describe('Given Login component', () => {
  describe('When the component is rendered', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      );
    });

    test("Then the 'Send' button should be in the form", async () => {
      const sendButton = screen.getByRole('button', { name: 'Sign In' });
      expect(sendButton).toBeInTheDocument();
    });

    test('Then the loginUser function should be called on form submit', async () => {
      const form = screen.getByRole('form');
      await fireEvent.submit(form);
      expect(useUsers().loginUser).toHaveBeenCalled();
    });
  });
});
