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

  rest.post(`${baseUrl}/register`, async (req, res, ctx) => {
    const {
      userId, name, password, confirmPassword,
    } = await req.json();

    if (name === '마카오김'
    && userId === 'makaoKim'
     && password === 'makaoKim92!'
      && password === confirmPassword) {
      return res(ctx.json({
        id: 1,
        userId: 'makaoKim',
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

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => res(ctx.json({
    orders: [
      {
        id: 1,
        recipient: 'makaoChoi',
        address: 'holywater dojo',
        message: 'deliver safe',
        productId: 1,
        quantity: 1,
        amount: 1000,
      },
    ],
  }))),

);

export default server;
