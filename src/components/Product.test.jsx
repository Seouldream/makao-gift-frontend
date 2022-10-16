import { fireEvent, render, screen } from '@testing-library/react';
import Product from './Product';

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
  useParams: () => ({
    productId: 1,
  }),

  useRouteMatch: () => ({ url: '/products/1' }),
}));

let products;
let pageNumbers;

jest.mock('../hooks/useProductsStore', () => () => ({
  products,
  pageNumbers,
  fetchProducts: jest.fn(),
  changePageNumber: jest.fn(),
}));

describe('Product', () => {
  beforeEach(() => {
    products = [
      {
        id: 1,
        brand: 'cup-maker',
        name: 'mug',
        price: 1_000,
        description: 'It is a nice cup',
      },

    ];
    pageNumbers = [1];
  });
  context('product detail', () => {
    it('상품 디테일 내역', () => {
      render(
        <Product />,
      );

      screen.getByText(/cup-maker/);
      screen.getByText('mug');
      screen.getByText(/It is a nice cup/);
      screen.getByText(/1000원/);
    });
  });

  context('When clicked plus button one time', () => {
    it('상품 2개를 주문한 총 가격 2천원 표시', () => {
      render(
        <Product />,
      );

      fireEvent.click(screen.getByRole('button', { name: /countUp/ }));
      screen.getByText(/2000원/);
    });
  });

  context('When clicked plus button three times and minus button one time', () => {
    it('수량 3개를 선택하고 3천원 표시 다시 1개를 뺀 총 가격 2천원 표시', () => {
      render(
        <Product />,
      );

      fireEvent.click(screen.getByRole('button', { name: /countUp/ }));
      fireEvent.click(screen.getByRole('button', { name: /countUp/ }));
      screen.getByText(/3000원/);

      fireEvent.click(screen.getByRole('button', { name: /countDown/ }));
      screen.getByText(/2000원/);
    });
  });
});
