import server from '../testServer';
import OrderListStore from './OrderListStore';

const context = describe;

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('ProductsStore', () => {
  let orderListStore;

  beforeEach(() => {
    orderListStore = new OrderListStore();
  });

  describe('fetchOrderList', () => {
    it('sets orderList', async () => {
      await orderListStore.fetchOrderList();

      expect(orderListStore.orders[0].id).toBe(1);
      expect(orderListStore.orders[0].recipient).toBe('makaoChoi');
      expect(orderListStore.orders[0].address).toBe('holywater dojo');
      expect(orderListStore.orders[0].productId).toBe(1);
      expect(orderListStore.orders[0].quantity).toBe(1);
      expect(orderListStore.orders[0].amount).toBe(1000);
    });
  });
});
