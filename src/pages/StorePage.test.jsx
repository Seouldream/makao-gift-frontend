import { render, screen } from '@testing-library/react';

import StorePage from './StorePage';

const context = describe;
// 목킹 이름 수정하면 안됨!
jest.mock('react-router-dom', () => ({
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

let products;
let pageNumbers;

jest.mock('../hooks/useProductsStore', () => () => ({
  products,
  pageNumbers,
  fetchProducts: jest.fn(),
  changePageNumber: jest.fn(),
}));

describe('StorePage', () => {
  context('without products', () => {
    beforeEach(() => {
      products = [];
      pageNumbers = [];
    });

    it('현재 이용가능한 상품이 없다', () => {
      render(<StorePage />);
      screen.getByText(/현재 이용가능한 상품이 없습니다./);
    });
  });

  context('with 2 products', () => {
    beforeEach(() => {
      products = [
        {
          id: 1, brand: 'noBrand', name: 'InuInu', price: 100, description: 'shitBrand', url: 'sibal',
        },
        {
          id: 2, brand: 'InuBrand', name: 'ShitSHit', price: 10, description: 'ambigious', url: 'jeodoansam?????',
        },
      ];
      pageNumbers = [1];
    });

    it('상품 2개 정보 출력', () => {
      render(
        <StorePage />,
      );
      screen.getByText(/noBrand/);
      screen.getByText(/InuBrand/);
      screen.getByText(/ShitSHit/);
    });
  });
});
