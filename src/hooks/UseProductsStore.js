import { useEffect } from 'react';
import { productsStore } from '../stores/ProductsStore';

import useForceUpdate from './useForceUpdate';

export default function useProductsStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    productsStore.subscribe(forceUpdate);

    return () => productsStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return productsStore;
}
