import { apiService } from '../services/ApiService';

export default class ProductsStore {
  constructor() {
    this.listeners = new Set();

    this.products = [];
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

  async fetchProducts() {
    this.products = [];
    this.publish();

    this.products = await apiService.fetchProducts();
    this.publish();
  }
}

export const productsStore = new ProductsStore();
