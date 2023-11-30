import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import Details from './details';
import { store } from '../../store/store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
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
        title: 'Post',
        userId: 1,
      },
    ],
  }),
}));

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    loadUsers: jest.fn(),
    users: [
      {
        id: 1,
        name: 'Sergio',
        username: 'Sergio',
        email: '',
      },
    ],
  }),
}));

describe('Given the Details component', () => {
  describe('When the component is rendered', () => {
    beforeEach(() => {
      render(
        <Router initialEntries={['/detail/1']}>
          <Provider store={store}>
            <Details></Details>
          </Provider>
        </Router>
      );
    });
    test('Then it should show post details on the screen', () => {
      const filmDetails = screen.getByText('Post');
      expect(filmDetails).toBeInTheDocument();
    });
  });
});

describe('Given the Details component', () => {
  describe('When calling the fetchCommentsData functions', () => {
    test('Then it should fetch data from the API and return the response', async () => {
      const mockData = [
        {
          id: 1,
          name: 'Sergio',
          email: '',
          body: 'body',
        },
      ];
      const expectedUrl =
        'https://jsonplaceholder.typicode.com/posts/1/comments';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });
      await waitFor(() => {
        render(
          <Router initialEntries={['/detail/1']}>
            <Provider store={store}>
              <Details></Details>
            </Provider>
          </Router>
        );
      });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
        const commentItem = screen.getByText('body');
        expect(commentItem).toBeInTheDocument();
      });
    });
  });
});
