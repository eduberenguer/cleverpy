import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({ currentUser: { name: 'Sergio' } }),
}));

describe('Given the Header component', () => {
  describe('When it is instantiated', () => {
    render(
      <Router>
        <Provider store={store}>
          <Header></Header>
        </Provider>
      </Router>
    );

    test('Then the buttons should be rendered when there is a currentUSer ', () => {
      const buttonElement = screen.getAllByRole('button');
      expect(buttonElement[0]).toBeInTheDocument();
    });
  });
});
