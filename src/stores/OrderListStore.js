import { apiService } from '../services/ApiService';

export default class OrderListStore {
  constructor() {
    this.listeners = new Set();

    this.orders = [];
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

  async fetchOrderList() {
    this.orders = [];
    this.publish();

    this.orders = await apiService.fetchOrderList();

    this.publish();
  }
}

export const orderListStore = new OrderListStore();
