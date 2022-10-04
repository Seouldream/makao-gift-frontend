import { render, screen } from '@testing-library/react';
import { userStore } from '../stores/UserStore';
import UserInfo from './UserInfo';

test('UserInfo', async () => {
  await userStore.fetchUser();
  render(<UserInfo />);

  screen.getByText(/내 잔액:/);
});
