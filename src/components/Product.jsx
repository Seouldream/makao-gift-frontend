/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';

import { Link, useLocation, useParams } from 'react-router-dom';

import styled from 'styled-components';

import useProductsStore from '../hooks/useProductsStore';
import useUserStore from '../hooks/useUserStore';

import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  display: grid;
  margin: 0;
  grid-template-columns:1fr 1fr;
  align-items: center;
  justify-content: center;
  height: 60vw;
  width: 70vw;  
`;
const ProductImage = styled.img`
  width: 35vw;
  height: 35vw;
  margin: 0 2rem;
  border-radius: 15px;
`;

const ButtonImage = styled.img`
  width: 2vh;
  height: 2vh;
`;

const CountContainer = styled.span`
 padding: 0 0.5rem;
`;

const Name = styled.h1`
  font-size: 1.5rem;
`;

const DetailBox = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  align-items: center;
  height: 40vw;
  width: 40vw;
`;

const PriceBox = styled.span`
  font-weight: bold;
  font-size: 1.3rem;
`;

const BrandBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-size: 1rem;
`;

const CountBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const ProductDetailBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const TotalAmountBox = styled.div`
    
  
`;

const LoginButton = styled.button`

  padding: 0.7rem 1em;
  width: 100%;
  border: 1px solid #ABD9FF;
  background-color: #ABD9FF;
  color: #FFF;
  border-radius: 10px;
`;

export default function Product() {
  const params = useParams();

  const location = useLocation();

  const [count, setCount] = useState(1);

  const [initialPrice, setInitialPrice] = useState(0);

  const [errorMessage, setErrorMessage] = useState(null);

  const [amount, setAmount] = useState(0);

  const productsStore = useProductsStore();

  const userStore = useUserStore();

  useEffect(() => {
    productsStore.fetchProducts();
  }, []);

  const { products } = productsStore;

  const handleClickCountDown = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };
  const handleClickCountUp = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    setAmount(initialPrice * count);
  }, [count]);

  const { accessToken } = location.state;

  console.log('accessToken', accessToken);

  const handleClickShowMessage = () => {
    setErrorMessage('X 잔액이 부족하여 선물하기가 불가합니다 X');
  };

  return (
    <Container>
      {products.filter((product) => product.id === parseInt(params.productId, 10))
        .map((product) => (
          <div key={product.id}>
            <ProductImage
              // eslint-disable-next-line import/no-dynamic-require, global-require
              src={product.url}
              alt="productImg"
            />
          </div>
        ))}
      {products.filter((product) => product.id === parseInt(params.productId, 10))
        .map((product) => (
          <DetailBox key={product.id}>
            <Name>{product.name}</Name>
            <PriceBox>
              {numberFormat(product.price)}
              원
            </PriceBox>
            <BrandBox>
              <span>제조사</span>
              {' '}
              <span>{product.brand}</span>
            </BrandBox>
            <CountBox>
              <span>구매수량</span>
              <span>
                <button type="button" aria-label="countDown" onClick={handleClickCountDown}>
                  {count === 1
                    ? (
                      <ButtonImage
                        src="https://github.com/Seouldream/makao-gift-frontend/blob/makaogift-frontend/minus-gray.png?raw=true"
                        alt="countDown"
                      />
                    )
                    : (
                      <ButtonImage
                        src="https://github.com/Seouldream/makao-gift-frontend/blob/makaogift-frontend/minus-black.png?raw=true"
                        alt="countDown"
                      />
                    ) }
                </button>
                <CountContainer>{count}</CountContainer>
                <button type="button" aria-label="countUp" name="seongHwanButton" onClick={handleClickCountUp}>
                  <ButtonImage
                    src="https://github.com/Seouldream/makao-gift-frontend/blob/makaogift-frontend/plus-black.png?raw=true"
                    alt="countUp"
                  />
                </button>
              </span>
            </CountBox>
            <ProductDetailBox>
              <span>
                상품설명
              </span>
              <span>
                {product.description}
              </span>
            </ProductDetailBox>
            <TotalAmountBox>
              총 상품금액:
              {' '}
              {initialPrice === 0
                ? setInitialPrice(product.price)
                : amount}
              원
            </TotalAmountBox>
            {accessToken === ''
              ? (
                <Link to="/login">
                  <LoginButton>
                    선물하기
                  </LoginButton>
                </Link>
              )
              : (
                (
                  amount > userStore.amount
                    ? (
                      <>
                        <LoginButton type="button" onClick={handleClickShowMessage}>
                          선물하기
                        </LoginButton>
                        <p>{errorMessage}</p>
                      </>
                    )
                    : (
                      <Link
                        to="/order"
                        state={{
                          product,
                          quantity: count,
                          amount,
                          url: '',
                        }}
                      >
                        <LoginButton type="button">
                          선물하기
                        </LoginButton>
                      </Link>
                    ))
              )}
          </DetailBox>
        ))}
    </Container>
  );
}
