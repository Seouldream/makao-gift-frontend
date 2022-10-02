import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import StorePage from '../pages/StorePage';
import OrderPage from '../pages/OrderPage';
import OrderListPage from '../pages/OrderListPage';

export default function useRouteComponent() {
  const { pathname } = window.location;

  const components = {
    '/': HomePage,
    '/login': LoginPage,
    '/products': StorePage,
    '/order': OrderPage,
    '/orders': OrderListPage,
  };

  return components[pathname] || HomePage;
}
