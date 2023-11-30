import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Post } from '../../models/post.model';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { PostCard } from './post.card';
import userEvent from '@testing-library/user-event';
import { usePosts } from '../../hooks/use.posts';

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    token: 'token',
  }),
}));

jest.mock('../../hooks/use.posts', () => ({
  usePosts: jest.fn().mockReturnValue({
    deletePost: jest.fn(),
  }),
}));

const mockPost = {
  id: 1,
  title: 'Title',
  body: 'Body',
  userId: 1,
} as unknown as Post;

describe('Given PostCard component', () => {
  describe('When it is rendered', () => {
    beforeEach(() => {
      render(
        <Router>
          <Provider store={store}>
            <PostCard item={mockPost} userName="Sergio"></PostCard>
          </Provider>
        </Router>
      );
    });

    test('Then the post title should be in the document', () => {
      const element = screen.getByText('Title');
      expect(element).toBeInTheDocument();
    });
    test('Then the deletePost function should be called when the delete button is clicked', async () => {
      const buttonElement = screen.getByRole('button');
      await userEvent.click(buttonElement);
      expect(usePosts().deletePost).toHaveBeenCalled();
    });
  });
});
