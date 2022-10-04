import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserInfo from './UserInfo';

const Navigation = styled.nav`
  display: flex;
  justify-content: space-around;
`;

const MenuList = styled.ul`
  display: flex;
  align-items: center;
  right: 5em;
  gap: 3em;
`;

export default function Header() {
  return (
    <header>
      <Navigation>
        <MenuList>
          <li>
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
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
        </MenuList>
      </Navigation>
    </header>
  );
}
