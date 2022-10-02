import { apiService } from '../services/ApiService';

export default class UserStore {
  constructor() {
    this.name = '';
    this.id = '';
    this.amount = 0;
    this.orderList = [];
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
}

export const userStore = new UserStore();
