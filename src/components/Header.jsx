import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useOrderListStore from '../hooks/useOrderListStore';
import useUserStore from '../hooks/useUserStore';
import PrimaryButton from '../ui/PrimaryButton';
import Button from '../ui/Button';
import UserInfo from './UserInfo';

const Container = styled.header`
  max-width: 1920px;
  min-width: 1024px;
  min-height: 7vh;
  width: 100%;
  padding: 1em;
  border: 3em black;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  color: #FFF;
`;

const LoginNavigation = styled.nav`
  display: flex;
  justify-content: space-around;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
`;

const LoginMenu = styled.ul`
  display: flex;
  align-items: center;
  right: 5em;
  gap: 3em;

`;

const MenuList = styled.ul`
  display: flex;
  gap: 3.5em;

  li {
    /* box-shadow: inset 0 -5px 0 orange;
    line-height: 10px; */
    a{
      &:focus , &hover {
        text-decoration: underline;
        text-decoration-color: #57CCFF;
        text-decoration-thickness: .3em;
      }
    }   
    }
`;

const LoginButtonBox = styled.div`
  display: flex;
  gap: 2em;
`;

const Home = styled.li`
  padding: 1em 2.5em;

  a{
      &:focus , &hover {
        text-decoration: underline;
        text-decoration-color: #57CCFF;
        text-decoration-thickness: .3em;
      }
    }
`;
export default function Header({ accessToken, setAccessToken }) {
  const userStore = useUserStore();

  const navigate = useNavigate();

  const orderListStore = useOrderListStore();

  const handleClickResetState = () => {
    userStore.loginState = '';
    userStore.registrationState = '';
    orderListStore.orderState = '';
  };

  console.log('accessToken FROM HEADER', accessToken);

  const handleLogout = () => {
    setAccessToken('');
    handleClickResetState();
    navigate('/');
  };

  return (
    <Container>
      {accessToken ? (
        <MenuContainer>
          <Navigation>
            <MenuList>
              <li className="fff">
                <Link to="/">홈</Link>
              </li>
              <li>
                <Link to="/products">스토어</Link>
              </li>
              <li>
                <Link to="/orders">주문조회</Link>
              </li>
              <li>
                <UserInfo />
              </li>
            </MenuList>
          </Navigation>
          <LoginButtonBox>
            <PrimaryButton
              type="button"
              onClick={handleLogout}
            >
              로그아웃
            </PrimaryButton>
          </LoginButtonBox>
        </MenuContainer>
      ) : (
        <LoginNavigation>
          <Home>
            <Link to="/">홈</Link>
          </Home>
          <LoginMenu>
            <Link to="/signup">
              <Button onClick={handleClickResetState}>
                회원가입
              </Button>
            </Link>
            <Link to="/login">
              <Button onClick={handleClickResetState}>
                로그인
              </Button>
            </Link>
          </LoginMenu>
        </LoginNavigation>
      )}
    </Container>
  );
}
