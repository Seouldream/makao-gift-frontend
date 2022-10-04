import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderListPage from './pages/OrderListPage';
import OrderPage from './pages/OrderPage';
import ProductDetailPage from './pages/ProductDetailPage';
import StorePage from './pages/StorePage';
import GlobalStyle from './styles/GlobalStyle';

const Main = styled.main`
  padding: 1em;
  max-width: 1920px;
  min-width: 1024px;
  min-height: 100vh;
  margin: 0px auto;
`;

export default function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Header />
      <Main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<StorePage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="/orders/:productId" element={<OrderDetailPage />} />
          <Route
            path="*"
            element={(
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            )}
          />
        </Routes>
      </Main>
    </>
  );
}
