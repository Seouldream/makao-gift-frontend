/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { userId, password } = await req.json();

    if (userId === 'makaoKim' && password === 'iammakaoKim92!') {
      return res(ctx.json({
        accessToken: 'ACCESS.TOKEN',
        name: '마카오김',
        amount: 50_000,
      }));
    }

    return res(
      ctx.status(400),
    );
  }),
);

export default server;
