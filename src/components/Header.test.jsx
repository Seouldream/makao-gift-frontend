import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('Header', () => {
  function renderHeader(accessToken, setAccessToken) {
    render(<Header
      accessToken={accessToken}
      setAccessToken={setAccessToken}
    />);
  }

  it('renders "홈" link', () => {
    const accessToken = '';
    const setAccessToken = jest.fn();
    renderHeader(accessToken, setAccessToken);

    screen.getByText(/홈/);
  });

  context('with logged in', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    it('render "로그인" button', () => {
      const accessToken = '';
      const setAccessToken = jest.fn();
      renderHeader(accessToken, setAccessToken);

      screen.getByText(/홈/);

      screen.getByText(/로그인/);
    });

    context('with logged out', () => {
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify('ACESS TOKEN'));
      });

      it('renders "로그아웃" button', () => {
        const accessToken = 'accessToken';
        const setAccessToken = jest.fn();
        renderHeader(accessToken, setAccessToken);

        fireEvent.click(screen.getByText(/로그아웃/));

        expect(navigate).toBeCalledWith('/');
      });
    });
  });
});
