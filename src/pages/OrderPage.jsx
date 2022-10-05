/* eslint-disable react/jsx-props-no-spreading */
// import LoginForm from '../components/LoginForm';

import { useForm } from 'react-hook-form';
import {
  Link, Navigate, useLocation, useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';

import cat from '../assets/uselessCandy1.jpeg';
import { orderListStore } from '../stores/OrderListStore';

const ProductImage = styled.img`
  width: 300px;
  height: 300px
`;

export default function OrderPage() {
  const location = useLocation();

  const navigate = useNavigate();

  const { product, quantity, amount } = location.state;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (recipientInfo) => {
    const { recipient, address, message } = recipientInfo;
    const productInfo = { product, quantity, amount };

    orderListStore.requestPlaceAnOrder({
      recipient,
      address,
      message,
      productId: productInfo.product.id,
      quantity,
      amount,
    });

    navigate('/orders');
  };

  return (
    <div>
      <ProductImage
        // eslint-disable-next-line import/no-dynamic-require, global-require
        src={cat}
        alt="productImg"
      />
      <p>
        {product.brand}
      </p>
      <p>
        {product.name}
      </p>
      <p>
        구매수량:
        {' '}
        {quantity}
      </p>
      <p>
        총 상품 금액:
        {' '}
        {amount}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="input-recipient">
            받는 분 성함
          </label>
          <input
            id="input-recipient"
            {...register('recipient', {
              required: true,
              minLength: 3,
              maxLength: 7,
            })}
          />
        </div>
        <div>
          <label htmlFor="input-address">
            받는 분 주소
          </label>
          <input
            id="input-address"
            type="text"
            {...register('address', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="input-message">
            받는 분께 보내는 메세지
          </label>
          <input
            id="input-message"
            {...register('message', { required: true })}
          />
        </div>
        <button type="submit">
          선물하기
        </button>
      </form>
    </div>
  );
}
