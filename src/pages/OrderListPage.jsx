// import LoginForm from '../components/LoginForm';

import { useEffect } from 'react';
import OrderList from '../components/OrderList';
import useOrderListStore from '../hooks/UseOrderListStore';

export default function OrderListPage() {
  const orderListStore = useOrderListStore();

  useEffect(() => {
    orderListStore.fetchOrderList();
  }, []);
  return (
    <OrderList />
  );
}
