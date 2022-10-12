import { render, screen } from '@testing-library/react';
import Products from './Products';

const context = describe;

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate: () => ({
    navigate: jest.fn(),
  }),
}));

// jest.mock('../hooks/useProductsStore', () => () => ({
//   products,
//   pageNumbers,
//   fetchProducts: jest.fn(),
//   changePageNumber: jest.fn(),
// }));

describe('Products', () => {
  const handleClick = jest.fn();

  function renderProducts(products, pageNumbers) {
    render((
      <Products
        products={products}
        pageNumbers={pageNumbers}
        onClickPageButton={handleClick}
      />
    ));
  }

  context('without products', () => {
    const products = [];
    const pageNumbers = [];

    it('현재 이용가능한 상품이 없다', () => {
      renderProducts(products, pageNumbers);
      screen.getByText(/현재 이용가능한 상품이 없습니다./);
    });
  });

  context('with products', () => {
    const products = [
      {
        id: 1, brand: 'noBrand', name: 'InuInu', price: 100, description: 'shitBrand', url: 'sibal',
      },
      {
        id: 2, brand: 'InuBrand', name: 'ShitSHit', price: 10, description: 'ambiguous', url: 'jeodoansam?????',
      },
    ];
    const pageNumbers = [1];

    it('이용가능한 상품이 있을때', () => {
      renderProducts(products, pageNumbers);
      screen.getByText(/noBrand/);
    });
  });
});
