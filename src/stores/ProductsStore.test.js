import server from '../testServer';

import ProductsStore from './ProductsStore';

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
  let productsStore;

  beforeEach(() => {
    productsStore = new ProductsStore();
  });

  describe('fetchProducts', () => {
    it('sets products information', async () => {
      await productsStore.fetchProducts();

      expect(productsStore.products[0].id).toBe(1);
      expect(productsStore.products[0].brand).toBe('cup-maker');
      expect(productsStore.products[0].name).toBe('mug');
      expect(productsStore.products[0].description).toBe('It is a nice cup');
    });
  });
});
