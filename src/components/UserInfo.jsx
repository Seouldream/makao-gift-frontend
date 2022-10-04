import { useEffect } from 'react';

import useUserStore from '../hooks/UseUserStore';
import numberFormat from '../utils/numberFormat';

export default function UserInfo() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  return (
    <p>
      내 잔액:
      {' '}
      {numberFormat(userStore.amount)}
      원
    </p>
  );
}
