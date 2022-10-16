import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import server from '../testServer';
import SignupForm from './SignupForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({

  useNavigate() {
    return navigate;
  },
}));

test('signup', async () => {
  server.listen();

  render(<SignupForm />);

  screen.getByText('SIGN UP');

  fireEvent.change(screen.getByLabelText('이름:'), {
    target: { value: '마카오김' },
  });

  fireEvent.change(screen.getByLabelText('아이디:'), {
    target: { value: 'makaoKim' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호:'), {
    target: { value: 'makaoKim92!' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
    target: { value: 'makaoKim92!' },
  });

  fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

  await waitFor(() => {
    expect(navigate).toBeCalledWith('/');
  });
});
