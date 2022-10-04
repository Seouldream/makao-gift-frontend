import { render, screen, waitFor } from '@testing-library/react';
import { productsStore } from '../stores/ProductsStore';
import Products from './Products';

test('Products', async () => {
  await productsStore.fetchProducts();

  render(<Products />);

  await waitFor(() => {
    screen.getByText(/mug/);
  });
});
