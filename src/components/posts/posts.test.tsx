import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { store } from '../../store/store';
import Posts from './posts';
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
    usersState: 'loaded',
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

const mockOberserve = () => {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
};

window.IntersectionObserver = jest.fn().mockImplementation(mockOberserve);

jest.mock('../../hooks/use.posts', () => ({
  usePosts: jest.fn().mockReturnValue({
    loadPosts: jest.fn(),
    posts: [
      {
        id: 1,
        title: 'Title',
      },
    ],
  }),
}));

jest.mock('../filter/filter', () => ({
  Filter: jest.fn((props) => (
    <input
      data-testid="filter-input"
      value={props.value}
      onChange={(e) => props.onChange(e)}
    />
  )),
}));

describe('Given the Users component', () => {
  describe('When Posts is is rendered', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <Posts></Posts>
          </Router>
        </Provider>
      );
    });
    test('Then it should render the greetings section in the document', () => {
      const userNameField = screen.getByText('Welcome Sergio!');
      expect(userNameField).toBeInTheDocument();
    });
    test('Then it should update filterText state on input change', () => {
      const filterInput = screen.getByTestId('filter-input');
      fireEvent.change(filterInput, { target: { value: 'NewFilterValue' } });
      expect((filterInput as HTMLInputElement).value).toBe('NewFilterValue');
    });
  });
  describe('When the component is rendered having a valid token', () => {
    beforeEach(() => {
      usePosts().postsState = 'idle';
      render(
        <Provider store={store}>
          <Router>
            <Posts></Posts>
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

describe('Given the Posts component', () => {
  describe('When the component is rendered having a valid token', () => {
    beforeEach(() => {
      usePosts().postsState = 'loaded';
      render(
        <Provider store={store}>
          <Router>
            <Posts></Posts>
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
