import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { store } from '../store/store';
import { usePosts } from './use.posts';
import { PostsRepository } from '../services/posts.repository';
import { postsActions } from '../redux/posts.slice';
import { Post } from '../models/post.model';
import { createPostAsync } from '../redux/posts.thunks';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

const mockId = 1;

const mockPost = {
  id: 1,
  title: 'post',
} as unknown as Post;

const mockRepo = {
  create: jest.fn().mockResolvedValue(mockPost),
} as unknown as PostsRepository;

PostsRepository.prototype.delete = jest.fn();
(PostsRepository.prototype.delete as jest.Mock).mockResolvedValue(true);

function TestComponent() {
  const { loadPosts, deletePost, createPost } = usePosts();

  return (
    <>
      <button onClick={() => loadPosts()}></button>
      <button onClick={() => deletePost(mockId)}></button>
      <button onClick={() => createPost(mockPost)}></button>
    </>
  );
}

describe('Given the useUsers custom hook', () => {
  let elements: HTMLElement[];
  beforeEach(async () => {
    await act(() =>
      render(
        <Router>
          <Provider store={store}>
            <TestComponent></TestComponent>
          </Provider>
        </Router>
      )
    );
    elements = screen.getAllByRole('button');
  });
  describe('When is rendered', () => {
    test('Then the loadPosts function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[0]);
        expect(useDispatch()).toHaveBeenCalled();
      });
    });

    test('Then the deletePost function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[1]);
        expect(PostsRepository.prototype.delete).toHaveBeenCalled();
        store.dispatch(postsActions.deletePost(mockId));
      });
    });
    test('Then the createPost function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[2]);
        store.dispatch(createPostAsync({ repo: mockRepo, post: mockPost }));
      });
    });
  });
});
