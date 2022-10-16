/* eslint-disable react/jsx-props-no-spreading */
// import LoginForm from '../components/LoginForm';

import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useOrderListStore from '../hooks/useOrderListStore';
import useUserStore from '../hooks/useUserStore';

const ProductImage = styled.img`
  width: 15vw;
  height: 15vw;
  border-radius: 15px;
  margin-right: 2rem;
`;

const Error = styled.div`
  margin-bottom: 1.4em;
  color: #f23434d3;
`;

const P = styled.p`
  margin-bottom: 1.4em;
  color: #A0A0A0;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(5,1fr);
  width: 60vw;
  height: 70vh;
  justify-content: center;
`;

const InputBlock1 = styled.div`
  grid-row: 2 / 3;
`;

const InputBlock2 = styled.div`
  grid-row: 3 / 4;
`;

const InputBlock3 = styled.div`
  grid-row: 3 / 4;
`;

const InputBlock4 = styled.div`
  grid-row: 4 / 5;
`;

const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height:15vw;
`;

const DetailSection = styled.div`
  display: grid;
  align-content: space-between;
`;

export default function OrderForm() {
  const orderListStore = useOrderListStore();

  const location = useLocation();

  const navigate = useNavigate();

  const userStore = useUserStore();

  const { product, quantity, amount } = location.state;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const myAmount = userStore.amount;

  console.log(myAmount);

  const onSubmit = async (recipientInfo) => {
    const { recipient, address, message } = recipientInfo;
    const productInfo = { product, quantity, amount };

    if (amount > myAmount) {
      return;
    }
    await orderListStore.requestPlaceAnOrder({
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
    <Container>
      <DetailContainer>
        <div>
          <ProductImage
            // eslint-disable-next-line import/no-dynamic-require, global-require
            src={product.url}
            alt="productImg"
          />
        </div>
        <DetailSection>
          <span>
            <p>
              {product.brand}
            </p>
            <p>
              {product.name}
            </p>
          </span>
          <span>
            <p>
              구매수량:
              {' '}
              {quantity}
            </p>
            <p>
              총 상품 금액:
              {' '}
              {amount}
              원
            </p>
          </span>
        </DetailSection>
      </DetailContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBlock1>
          <label htmlFor="input-recipient">
            받는 분 성함
          </label>
          <input
            id="input-recipient"
            {...register('recipient', {
              required: true,
              minLength: 3,
              maxLength: 7,
              pattern: /^[ㄱ-ㅎ|가-힣]+$/,
            })}
          />
          {errors.recipient ? (
            <Error>3 ~ 7자까지 한글만 사용 가능</Error>
          ) : (
            <P>3 ~ 7자까지 한글만 사용 가능</P>
          ) }
        </InputBlock1>
        <InputBlock2>
          <label htmlFor="input-address">
            받는 분 주소
          </label>
          <input
            id="input-address"
            type="text"
            {...register('address', {
              required: true,
              minLength: 1,
            })}
          />
          {errors.address ? (
            <Error>주소지를 입력해주세요</Error>
          ) : (
            <P>주소지를 입력해주세요</P>
          ) }
        </InputBlock2>
        <InputBlock3>
          <label htmlFor="input-message">
            받는 분께 보내는 메세지
          </label>
          <input
            id="input-message"
            {...register('message', {
              required: true,
              maxLength: 100,
            })}
          />
          {errors.message ? (
            <Error>100글자 이내로 입력해주세요</Error>
          ) : (
            <P>100글자 이내로 입력해주세요</P>
          ) }
        </InputBlock3>
        <InputBlock4>
          <button type="submit">
            선물하기
          </button>
        </InputBlock4>
      </form>
    </Container>
  );
}
