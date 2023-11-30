import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { store } from '../../store/store';
import { Filter } from './filter';
import { usePosts } from '../../hooks/use.posts';

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
  }),
}));

jest.mock('../../hooks/use.posts', () => ({
  usePosts: jest.fn().mockReturnValue({
    loadPosts: jest.fn(),
  }),
}));

const onChange = jest.fn();

describe('Given the Filter component', () => {
  describe('When it is rendered', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <Filter value="" onChange={onChange}></Filter>
          </Router>
        </Provider>
      );
    });
    test('Then it should display the username field', () => {
      const userNameField = screen.getByRole('textbox');
      expect(userNameField).toBeInTheDocument();
    });
    test('Then it should call loadPosts when an option is selected', () => {
      const selectElement = screen.getByRole('combobox');
      fireEvent.change(selectElement, { target: { value: '1' } });
      expect(usePosts().loadPosts).toHaveBeenCalledWith('1');
    });
  });
});
