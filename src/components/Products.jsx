import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import useProductsStore from '../hooks/UseProductsStore';
import numberFormat from '../utils/numberFormat';
import cup from '../assets/madeleineMug.jpeg';

const ProductImg = styled.img`
  width: 200px;
  height: 200px;
`;

export default function Products() {
  const productsStore = useProductsStore();

  const { products } = productsStore;

  if (!products.length) {
    return (
      <p>현재 이용가능한 상품이 없습니다.</p>
    );
  }

  return (
    <>
      <nav>
        <ul>
          {products.map((product) => (
            <Link
              style={{ display: 'block', margin: '1rem 0' }}
              to={`/products/${product.id}`}
              key={product.id}
            >
              <li key={product.id}>
                <ProductImg src={cup} alt="cupImage" />
                <br />
                {product.brand}
                <br />
                {product.name}
                <br />
                {numberFormat(product.price)}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
