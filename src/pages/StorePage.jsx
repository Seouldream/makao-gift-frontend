import { useEffect } from 'react';
import Products from '../components/Products';
import useProductsStore from '../hooks/UseProductsStore';

export default function StorePage() {
  const productsStore = useProductsStore();

  useEffect(() => {
    productsStore.fetchProducts();
  }, []);

  return (
    <Products />
  );
}
