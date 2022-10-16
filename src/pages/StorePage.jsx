import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../components/Products';
import useProductsStore from '../hooks/useProductsStore';

export default function StorePage({ accessToken }) {
  const productsStore = useProductsStore();

  useEffect(() => {
    productsStore.fetchProducts();
  }, []);

  const navigate = useNavigate();

  const { products, pageNumbers } = productsStore;

  const handleClickPageButton = (number) => {
    productsStore.changePageNumber(number);
    navigate(`/products?page=${number}`);
  };

  return (
    <Products
      products={products}
      pageNumbers={pageNumbers}
      onClickPageButton={handleClickPageButton}
      accessToken={accessToken}
    />
  );
}
