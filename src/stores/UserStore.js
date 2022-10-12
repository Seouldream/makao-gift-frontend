import { apiService } from '../services/ApiService';

export default class UserStore {
  constructor() {
    this.listeners = new Set();

    this.userId = '';
    this.name = '';
    this.id = '';
    this.amount = 0;
    this.orderList = [];

    this.loginState = '';

    this.registrationState = '';

    this.errorMessage = '';
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  async login({ userId, password }) {
    try {
      const { accessToken, name, amount } = await apiService.postSession({
        userId, password,
      });

      this.name = name;
      this.amount = amount;

      return accessToken;
    } catch (e) {
      const { message } = e.response.data;
      this.changeLoginState('fail', { errorMessage: message });
      return '';
    }
  }

  async fetchUser() {
    const { userId, name, amount } = await apiService.fetchUser();

    this.userId = userId;
    this.name = name;
    this.amount = amount;

    this.publish();
  }

  async register({
    name, userId, password, confirmPassword,
  }) {
    try {
      await apiService.createUser({
        userId, name, password, confirmPassword,
      });
    } catch (e) {
      const { message } = e.response.data;
      this.changeRegistrationState('existing', { errorMessage: message });
    }
  }

  changeLoginState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.loginState = state;
    this.publish();
  }

  changeRegistrationState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.registrationState = state;
    this.publish();
  }

  get isExistingUserId() {
    return this.registrationState === 'existing';
  }
}

export const userStore = new UserStore();
