import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import useForceUpdate from './hooks/useForceUpdate';
import useUserStore from './hooks/useUserStore';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderListPage from './pages/OrderListPage';
import OrderPage from './pages/OrderPage';
import ProductPage from './pages/ProductPage';
import SignupPage from './pages/SignupPage';
import StorePage from './pages/StorePage';
import { apiService } from './services/ApiService';
import GlobalStyle from './styles/GlobalStyle';

const Main = styled.main`
  padding: 1em;
  max-width: 1920px;
  min-width: 1024px;
  min-height: 100vh;
  margin: 0px auto;
`;

export default function App() {
  const userStore = useUserStore();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
    if (accessToken) {
      userStore.fetchUser();
    }
  }, [accessToken]);

  return (
    <>
      <Reset />
      <GlobalStyle />
      <Header
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
      <Main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<StorePage accessToken={accessToken} />} />
          <Route path="/products/:productId" element={<ProductPage />} />
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
