import server from '../testServer';

import UserStore from './UserStore';

// jest.mock('../services/ApiService', () => ({
//   apiService: {
//     async postSession({ userId, password }) {
//       if (userId === 'makaoKim' && password === 'iammakaoKim92!') {
//         return {
//           name: '마카오김',
//           amount: 50_000,
//         };
//       }
//       throw new Error('Login failed');
//     },
//   },
// }));

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

describe('UserStore', () => {
  describe('login', () => {
    context('with correct user id and password', () => {
      it('loads user information', async () => {
        const userStore = new UserStore();

        await userStore.login({ userId: 'makaoKim', password: 'iammakaoKim92!' });

        expect(userStore.name).toBe('마카오김');
        expect(userStore.amount).toBe(50_000);
      });
    });

    context('with incorrect user id', () => {
      it('loads user information', async () => {
        const userStore = new UserStore();

        await userStore.login({ userId: 'xxx', password: 'iammakaoKim92!' });

        expect(userStore.name).toBe('');
        expect(userStore.amount).toBe(0);
      });
    });
  });
});
