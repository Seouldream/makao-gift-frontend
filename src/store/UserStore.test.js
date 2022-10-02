import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  describe('login', () => {
    context('with correct user id and password', () => {
      it('loads user information', () => {
        const userStore = new UserStore();

        userStore.login({ userId: 'makaoKim', password: 'iammakaoKim92!' });

        expect(userStore.name).toBe('마카오김');
        expect(userStore.amount).toBe(50_000);
      });
    });

    context('with incorrect user id', () => {
      it('loads user information', () => {
        const userStore = new UserStore();

        userStore.login({ userId: 'xxx', password: 'iammakaoKim92!' });

        expect(userStore.name).toBe('');
        expect(userStore.amount).toBe(0);
      });
    });
  });
});
