import { render, screen, waitFor } from '@testing-library/react';
import StorePage from './StorePage';

test('StorePage', async () => {
  render(<StorePage />);

  await waitFor(() => {
    screen.getByText(/mug/);
  });
});
