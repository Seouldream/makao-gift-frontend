import { apiService } from '../services/ApiService';

export default class UserStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
    this.id = '';
    this.amount = 0;
    this.orderList = [];
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
}

export const userStore = new UserStore();
