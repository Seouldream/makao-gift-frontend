// import LoginForm from '../components/LoginForm';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OrderList from '../components/OrderList';
import useOrderListStore from '../hooks/useOrderListStore';

export default function OrderListPage() {
  const orderListStore = useOrderListStore();

  useEffect(() => {
    orderListStore.fetchOrderList();
  }, []);
  return (
    <OrderList />
  );
}
