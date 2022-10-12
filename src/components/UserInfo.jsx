import { useEffect } from 'react';
import styled from 'styled-components';

import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/NumberFormat';

const Component = styled.p`
  color: #000;
`;

export default function UserInfo() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  return (
    <Component>
      내 잔액:
      {' '}
      {numberFormat(userStore.amount)}
      원
    </Component>
  );
}
