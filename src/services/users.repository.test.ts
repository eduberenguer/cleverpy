import { User } from '../models/user.model';
import { LoginCredentials } from '../types/loginCredentials';
import { UsersRepository } from './users.repository';

describe('Given the UsersRepository class', () => {
  let usersRepo: UsersRepository;

  beforeEach(() => {
    usersRepo = new UsersRepository('http://test.com/');
  });
  describe('When calling the getAll method', () => {
    test('Then it should fetch data from the API and return the response', async () => {
      const mockData = [{}];
      const expectedUrl = 'http://test.com/users';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await usersRepo.getAll();

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(mockData);
    });

    test('Then it should throw an error if the fetch is not successful', async () => {
      const expectedUrl = 'http://test.com/users';
      const mockErrorMessage = 'No data found';
      const error = new Error('Error: 400. No data found');

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: mockErrorMessage,
      });

      await expect(usersRepo.getAll()).rejects.toThrow(error);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('When calling the login method', () => {
    beforeEach(() => {
      usersRepo = new UsersRepository('http://test.com/');
    });
    test('Then it should fetch data from the API and return the response', async () => {
      const mockData = [
        {
          email: 'test@example.com',
          username: 'sergio',
          password: '1234',
        } as unknown as User,
      ];

      const expectedUrl = 'http://test.com/users';
      const credentials = {
        email: 'test@example.com',
        password: 'sergio',
      } as LoginCredentials;

      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await usersRepo.login(credentials);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response.currentUser).toEqual(mockData[0]);
      expect(response.token).toEqual('Fake token example');
    });
    test('Then it should throw an error with invalid credentials', async () => {
      const mockData = [
        {
          email: 'test@example.com',
          name: 'Sergio',
        } as unknown as User,
      ];

      const credentials = {
        email: 'test@example.com',
        password: '1234',
      } as LoginCredentials;

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      await expect(usersRepo.login(credentials)).rejects.toThrow(
        'Invalid credentials'
      );
    });
    test('Then it should throw an error with invalid credentials', async () => {
      const mockData = [
        {
          email: 'test@example.com',
          name: 'Sergio',
          username: 'user123',
          password: 'differentPassword',
        } as unknown as User,
      ];

      const credentials = {
        email: 'test@example.com',
        password: 'expectedPassword',
      } as LoginCredentials;

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      await expect(usersRepo.login(credentials)).rejects.toThrow(
        'Invalid credentials'
      );
    });
  });
});
