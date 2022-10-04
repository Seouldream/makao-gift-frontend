/* eslint-disable jsx-a11y/control-has-associated-label */
// import LoginForm from '../components/LoginForm';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import cat from '../assets/uselessCandy1.jpeg';
import minus from '../assets/minus-gray.png';
import plus from '../assets/plus-black.png';
import useProductsStore from '../hooks/UseProductsStore';
import numberFormat from '../utils/numberFormat';

const ProductImage = styled.img`
  width: 300px;
  height: 300px
`;

const ButtonImage = styled.img`
  width: 20px;
  height: 20px
`;

export default function ProductDetailPage() {
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

  const handleClickOrder = () => {

  };

  useEffect(() => {
    setAmount(initialPrice * count);
  }, [count]);

  return (
    <>
      {products.filter((product) => product.id === parseInt(params.productId, 10))
        .map((product) => (
          <div key={product.id}>
            <ProductImage
              // eslint-disable-next-line import/no-dynamic-require, global-require
              src={cat}
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
                <ButtonImage src={minus} alt="countDown" />
              </button>
              {count}
              <button type="button" onClick={handleClickCountUp}>
                <ButtonImage src={plus} alt="countDown" />
              </button>
            </span>
            <hr />
            상품설명
            {' '}
            이 상품은 이러이러합디다.
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
                url: cat,
              }}
            >
              <button type="button">선물하기</button>
            </Link>
          </div>
        ))}
    </>
  );
}
