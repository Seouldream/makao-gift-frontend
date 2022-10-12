import { render, screen, waitFor } from '@testing-library/react';
import { store } from 'codeceptjs';
import UserStore from '../stores/UserStore';
import server from '../testServer';
import UserInfo from './UserInfo';

describe('UserStore', () => {
  server.listen();

  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  test('UserInfo', async () => {
    await userStore.fetchUser();
    render(<UserInfo />);

    waitFor(() => {
      screen.getByText(/내 잔액:/);
      screen.getByText(/50000원:/);
    });
  });
});
