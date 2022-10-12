/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';

import useProductsStore from '../hooks/useProductsStore';

import numberFormat from '../utils/NumberFormat';

// import minus from '../assets/images/minus-gray.png';

// import plus from '../assets/images/plus-black.png';

const Container = styled.div`
  display: grid;
  grid-template-columns:1fr 1fr;
`;
const ProductImage = styled.img`
  width: 300px;
  height: 300px;
`;

const ButtonImage = styled.img`
  width: 20px;
  height: 20px;
`;

export default function Product() {
  const params = useParams();

  const [count, setCount] = useState(1);

  const [initialPrice, setInitialPrice] = useState(0);

  const [amount, setAmount] = useState(0);

  const productsStore = useProductsStore();

  useEffect(() => {
    productsStore.fetchProducts();
  }, []);

  const { products } = productsStore;

  const handleClickCountDown = () => {
    if (count === 0) {
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
            <h1>{product.name}</h1>
            <span>{numberFormat(product.price)}</span>
            <hr />
            <span>
              제조사
              {' '}
              {product.brand}
            </span>
            <hr />
            <span>
              구매수량
              <button type="button" onClick={handleClickCountDown}>
                <ButtonImage src="{minus}" alt="countDown" />
              </button>
              {count}
              <button type="button" onClick={handleClickCountUp}>
                <ButtonImage src="{plus}" alt="countUp" />
              </button>
            </span>
            <hr />
            상품설명
            {' '}
            {product.description}
            <hr />
            <p>
              총 상품금액:
              {' '}
              {initialPrice === 0
                ? setInitialPrice(product.price)
                : amount}
              원
            </p>
            <Link
              to="/order"
              state={{
                product,
                quantity: count,
                amount,
                url: '',
              }}
            >
              <button type="button">선물하기</button>
            </Link>
          </div>
        ))}
    </Container>
  );
}
