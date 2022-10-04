/* eslint-disable jsx-a11y/control-has-associated-label */
// import LoginForm from '../components/LoginForm';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useOrderListStore from '../hooks/UseOrderListStore';
import numberFormat from '../utils/numberFormat';
import poster from '../assets/posterFrame.jpeg';

const ProductImg = styled.img`
  width: 300px;
  height: 300px
`;

export default function OrderDetailPage() {
  const location = useLocation();

  const orderListStore = useOrderListStore();

  useEffect(() => {
    orderListStore.fetchOrderList();
  }, []);

  const { orderList } = orderListStore;

  const orderId = location.state.id;
  return (
    <>
      {orderList.filter((order) => order.id === orderId)
        .map((order) => (
          <div key={order.id}>
            <ProductImg src={poster} alt="posterImg" />
            <p>{order.brand}</p>
            <p>{order.name}</p>
            <hr />
            <p>
              구매수량
              {' '}
              {numberFormat(order.amount)}
              원
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
              {order.date}
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
