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
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('login', () => {
    context('with correct user id and password', () => {
      it('loads user information', async () => {
        await userStore.login({ userId: 'makaoKim', password: 'makaoKim92!' });

        expect(userStore.name).toBe('makaoKim');
        expect(userStore.amount).toBe(50_000);
      });
    });

    context('with incorrect user id', () => {
      it('loads user information', async () => {
        await userStore.login({ userId: 'xxx', password: 'iammakaoKim92!' });

        expect(userStore.name).toBe('');
        expect(userStore.amount).toBe(0);
      });
    });
  });

  describe('fetchUser', () => {
    it('sets user information', async () => {
      await userStore.fetchUser();

      expect(userStore.amount).toBe(50_000);
    });
  });
});
