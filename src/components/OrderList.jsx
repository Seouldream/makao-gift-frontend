import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import useOrderListStore from '../hooks/UseOrderListStore';
import stand from '../assets/whiteMonitorStand.jpeg';

const ProductImg = styled.img`
  width: 200px;
  height: 200px;
`;

export default function OrderList() {
  const orderListStore = useOrderListStore();

  const { orders } = orderListStore;

  if (!orders.length) {
    return (
      <p>내가 주문한 내역이 없습니다.</p>
    );
  }

  return (
    <>
      <h1>내가 주문한 내역입니다.</h1>
      <nav>
        <ul>
          {orders.map((order) => (
            <Link
              style={{ display: 'block', margin: '1rem 0' }}
              to={`/orders/${order.id}`}
              key={order.id}
              state={{
                id: order.id,
              }}
            >
              <li key={order.id}>
                <ProductImg src={stand} alt="productImage" />
                <br />
                {order.brand}
                <br />
                {order.name}
                <br />
                To.
                {order.recipient}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
