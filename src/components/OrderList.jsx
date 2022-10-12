import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useOrderListStore from '../hooks/useOrderListStore';

const ProductImg = styled.img`
  width: 200px;
  height: 200px;
`;

export default function OrderList() {
  const navigate = useNavigate();

  const orderListStore = useOrderListStore();

  const { orders, pageNumbers } = orderListStore;

  console.log('orderPageNumbers!', pageNumbers);

  const handleClickPageButton = (number) => {
    orderListStore.changePageNumber(number);
    navigate(`/orders?page=${number}`);
  };

  return (
    <div>
      {orders.length === 0 ? (
        <h1>내가 주문한 내역이 없습니다.</h1>
      ) : (
        <div>
          <h1>내가 주문한 내역입니다.</h1>
          <nav>
            <ul>
              {orders.map((order) => (
                <Link
                  style={{ display: 'block', margin: '1rem 0' }}
                  to={`/orders/${order.id}`}
                  key={order.id}
                  state={{
                    id: order.id,
                  }}
                >
                  <li key={order.id}>
                    <ProductImg src={order.url} alt="productImage" />
                    <br />
                    {order.brand}
                    <br />
                    {order.name}
                    <br />
                    To.
                    {order.recipient}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
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
          <nav />
          <Outlet />
        </div>
      )}
    </div>
  );
}
