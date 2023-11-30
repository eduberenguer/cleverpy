import { Post } from '../models/post.model';
import { PostsRepository } from './posts.repository';

describe('Given the PostsRepository class', () => {
  let postsRepo: PostsRepository;

  beforeEach(() => {
    postsRepo = new PostsRepository('http://test.com/');
  });
  describe('When calling the getAll method', () => {
    test('Then it should fetch data from the API and return the response', async () => {
      const mockData = [{}];
      const expectedUrl = 'http://test.com/posts';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await postsRepo.getAll();

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(mockData);
    });

    test('Then it should fetch data from the API and return the response with a filter', async () => {
      const mockData = [{}];
      const filter = 'filter';
      const expectedUrl = 'http://test.com/';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await postsRepo.getAll(filter);

      expect(global.fetch).toHaveBeenCalledWith(
        expectedUrl + 'posts' + '?userId=' + filter
      );
      expect(response).toEqual(mockData);
    });

    test('Then it should throw an error if the fetch is not successful', async () => {
      const expectedUrl = 'http://test.com/posts';
      const mockErrorMessage = 'No data found';
      const error = new Error('Error: 400. No data found');

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: mockErrorMessage,
      });

      await expect(postsRepo.getAll()).rejects.toThrow(error);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('When calling the create method', () => {
    test('Then it should fecth data from the API and return the response', async () => {
      const postData = {} as unknown as Post;
      const expectedUrl = 'http://test.com/posts';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(postData),
      });

      const response = await postsRepo.create(postData);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response).toEqual(postData);
    });
    test('Then it should throw an error if the fetch is not successful', async () => {
      const postData = {} as unknown as Post;
      const expectedUrl = 'http://test.com/posts';
      const mockErrorMessage = 'Failed to create post';
      const error = new Error(`Error 400: ${mockErrorMessage}`);

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: mockErrorMessage,
      });

      await expect(postsRepo.create(postData)).rejects.toThrow(error);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' },
      });
    });
  });

  describe('When calling the delete method', () => {
    test('Then it should send a DELETE request to the API and return the response status', async () => {
      const mockId = 1;
      const expectedUrl = `http://test.com/posts/${mockId}`;

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
      });

      const response = await postsRepo.delete(mockId);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(response).toEqual(true);
    });
  });
});
