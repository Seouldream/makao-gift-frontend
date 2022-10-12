import { useEffect } from 'react';
import { orderListStore } from '../stores/OrderListStore';

import useForceUpdate from './useForceUpdate';

export default function useOrderListStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    orderListStore.subscribe(forceUpdate);

    return () => orderListStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return orderListStore;
}
