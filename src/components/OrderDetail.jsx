/* eslint-disable jsx-a11y/control-has-associated-label */
// import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useOrderListStore from '../hooks/useOrderListStore';
import numberFormat from '../utils/numberFormat';

const ProductImg = styled.img`
  width: 300px;
  height: 300px
`;

export default function OrderDetail() {
  const location = useLocation();

  const orderListStore = useOrderListStore();

  useEffect(() => {
    orderListStore.fetchOrderList();
  }, []);

  const { orders } = orderListStore;
  console.log(orders);

  const orderId = location.state.id;
  return (
    <>
      {orders.filter((order) => order.id === orderId)
        .map((order) => (
          <div key={order.id}>
            <ProductImg src={order.url} alt="productImage" />
            <p>{order.brand}</p>
            <p>{order.name}</p>
            <hr />
            <p>
              구매수량
              {' '}
              {order.quantity}
            </p>
            <hr />
            <p>
              총 상품금액
              {' '}
              {order.amount}
            </p>
            <hr />
            <p>
              구매일
              {' '}
              {order.registrationDate}
            </p>
            <hr />
            <p>
              받는 분
              {' '}
              {order.recipient}
            </p>
            <hr />
            <p>
              받는 분 주소
              {' '}
              {order.address}
            </p>
            <hr />
            <p>
              받는 분께 보내는 메세지
              {' '}
              {order.message}
            </p>
            <hr />
          </div>
        ))}
    </>
  );
}
