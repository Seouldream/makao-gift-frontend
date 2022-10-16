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
  color: #FFF;
  align-items: center;
  justify-content: space-between;
  padding: 0 8rem;
`;

const LoginNavigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rem;

  li {
    
    a{
      &:focus , &hover {
        text-decoration: underline;
        text-decoration-color: #57CCFF;
        text-decoration-thickness: .3em;
      }
    }   
  }
`;

const LoginMenu = styled.div`
  display: flex;
  align-items: center;
`;

const MenuList = styled.ul`
  display: flex;
  gap: 3.5em;

  li {
    
    a{
      &:focus , &hover {
        text-decoration: underline;
        text-decoration-color: #57CCFF;
        text-decoration-thickness: .3em;
      }
    }   
    }
`;

const Home = styled.li`

  a{
      &:focus , &hover {
        text-decoration: underline;
        text-decoration-color: #57CCFF;
        text-decoration-thickness: .3em;
      }
    }
`;

const Info = styled.span`
  padding: 0 2rem;
`;

const Heading = styled.h1`
  color: black;
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

  const handleLogout = () => {
    setAccessToken('');
    handleClickResetState();
    navigate('/');
  };

  return (
    <Container>
      {accessToken ? (
        <MenuContainer>
          <nav>
            <MenuList>
              <Heading>선물하기</Heading>
              <li>
                <Link to="/">홈</Link>
              </li>
              <li>
                <Link to="/products">스토어</Link>
              </li>
              <li>
                <Link
                  to="/orders"
                >
                  주문조회
                </Link>
              </li>
            </MenuList>
          </nav>
          <LoginMenu>
            <Info>
              <UserInfo />
            </Info>
            <PrimaryButton
              type="button"
              onClick={handleLogout}
            >
              로그아웃
            </PrimaryButton>
          </LoginMenu>
        </MenuContainer>
      ) : (
        <LoginNavigation>
          <nav>
            <MenuList>
              <h1>선물하기</h1>
              <Home>
                <Link to="/">홈</Link>
              </Home>
              <li>
                <Link to="/products">스토어</Link>
              </li>
              <li>
                <Link to="/login">주문조회</Link>
              </li>
            </MenuList>
          </nav>
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
