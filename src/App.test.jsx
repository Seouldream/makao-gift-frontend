import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

const { default: App } = require('./App');

test('App', () => {
  render((
    <MemoryRouter>
      <App />
    </MemoryRouter>
  ));
});
