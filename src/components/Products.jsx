import { Link } from 'react-router-dom';
import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

const MessageContainer = styled.div`
  position: relative;
  padding: 0 2rem;


`;

const Banner = styled.img`
  position: absolute;
  height: 15vh;
  top:5rem;
  left:25%;
  border-bottom: 1px solid black;
`;

const ProductImg = styled.img`
  width: 25rem;
  height: 25rem;
  border-radius: 0.5em;
`;

const Line1 = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

const Line2 = styled.p`
  font-size: 2rem;
  font-weight: bold;
  padding: 1.5rem 0;
`;

const Line3 = styled.p`
  font-size: 1rem;
`;

const Heading = styled.h1`
  padding: 3rem 0.5rem 1rem 0 ;
  font-weight: bold;
`;

const ProductList = styled.ul`
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr 1fr 1fr;

  li {
    
    padding: 0 1rem;
  }
`;

const Detail1 = styled.p`
  color:#808080;
  padding-top: 1rem;
`;

const Detail2 = styled.p`
  font-size: 1.5rem;
  padding: 1rem 0%;
`;

const Detail3 = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

export default function Products({
  products, pageNumbers, onClickPageButton,
}) {
  if (!products.length) {
    return (
      <p>현재 이용가능한 상품이 없습니다.</p>
    );
  }

  const handleClickPageButton = (number) => {
    onClickPageButton(number);
  };

  return (
    <>
      <Banner src="banner" data-testid="background" alt="" />
      <MessageContainer>
        <Line1>평범한 선물은 주기도 민망하다구요?</Line1>
        <Line2>
          작정하고 준비한
          <br />
          마카오톡 선물하기 아이템
        </Line2>
        <Line3>마카오톡 선물하기에서만 볼 수 있는 특별템 기획전</Line3>
      </MessageContainer>
      <Heading>인기 선물을 한 자리에 모았어요.</Heading>
      <nav>
        <ProductList>
          {products.map((product) => (
            <Link
              style={{ display: 'block', margin: '1rem 0' }}
              to={`/products/${product.id}`}
              key={product.id}
            >
              <li key={product.id}>
                <ProductImg src={product.url} alt="cupImage" />
                <Detail1>
                  {product.brand}
                </Detail1>
                <Detail2>
                  {product.name}
                </Detail2>
                <Detail3>
                  {numberFormat(product.price)}
                  원
                </Detail3>
              </li>
            </Link>
          ))}
        </ProductList>
      </nav>
      <nav>
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                type="button"
                onClick={() => handleClickPageButton(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </>
  );
}
