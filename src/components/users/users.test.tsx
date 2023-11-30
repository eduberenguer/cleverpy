import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import '@testing-library/jest-dom';
import { store } from '../../store/store';
import Users from './users';
import { useUsers } from '../../hooks/use.users';

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    loadUsers: jest.fn(),
    users: [
      {
        id: 1,
        name: 'Sergio',
        address: {
          city: 'Madrid',
        },
        company: {
          name: 'Company',
        },
      },
    ],
    usersState: 'loaded',
  }),
}));

const mockOberserve = () => {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
};

window.IntersectionObserver = jest.fn().mockImplementation(mockOberserve);

describe('Given the Users component', () => {
  describe('When it is rendered', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <Users></Users>
          </Router>
        </Provider>
      );
    });
    test('Then it should have an email field', () => {
      const emailField = screen.getByText('Email:');
      expect(emailField).toBeInTheDocument();
    });

    describe('When the component is rendered having a valid token', () => {
      beforeEach(() => {
        useUsers().usersState = 'idle';
        render(
          <Provider store={store}>
            <Router>
              <Users></Users>
            </Router>
          </Provider>
        );
      });

      test('Then the PropagateLoader component should be rendered', async () => {
        const loader = await screen.getByTestId('spinner');
        expect(loader).toBeInTheDocument();
      });
    });
  });
});
