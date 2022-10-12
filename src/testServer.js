/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { userId, password } = await req.json();

    if (userId === 'makaoKim' && password === 'makaoKim92!') {
      return res(ctx.json({
        accessToken: 'ACCESS.TOKEN',
        name: 'makaoKim',
        amount: 50_000,
      }));
    }

    return res(ctx.status(400));
  }),

  rest.get(`${baseUrl}/users/me`, async (req, res, ctx) => res(ctx.json({
    userId: 'makaoKim',
    name: 'makaoKim',
    amount: 50_000,
  }))),

  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(ctx.json({
    products: [
      {
        id: 1, brand: 'cup-maker', name: 'mug', price: 1_000, description: 'It is a nice cup',
      },
    ],
  }))),

);

export default server;
