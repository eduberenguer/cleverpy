import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { store } from '../../store/store';
import { usePosts } from '../../hooks/use.posts';
import { CreateForm } from './create.form';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    currentUser: {
      id: 1,
      name: 'Sergio',
      address: {
        city: 'Madrid',
      },
      company: {
        name: 'Company',
      },
    },
  }),
}));

jest.mock('../../hooks/use.posts', () => ({
  usePosts: jest.fn().mockReturnValue({
    createPost: jest.fn(),
  }),
}));

describe('Given the CreateForm component', () => {
  describe('When it is rendered', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <CreateForm></CreateForm>
          </Router>
        </Provider>
      );
    });
    test('Then it should display a form in the screen', async () => {
      const button = screen.getAllByRole('button');
      await userEvent.click(button[0]);
      expect(screen.getByRole('form')).toBeInTheDocument();
    });
    test('Then the createPost function should be called after the submit event', async () => {
      const button = screen.getAllByRole('button');
      await userEvent.click(button[0]);
      const formElement = screen.getByRole('form');
      await fireEvent.submit(formElement);
      expect(usePosts().createPost).toHaveBeenCalled();
    });
  });
});
