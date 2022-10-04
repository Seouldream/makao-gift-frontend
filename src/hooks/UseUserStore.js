import { useEffect } from 'react';
import { userStore } from '../stores/UserStore';
import useForceUpdate from './UseForceUpdate';

export default function useUserStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    userStore.subscribe(forceUpdate);

    return () => userStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return userStore;
}
