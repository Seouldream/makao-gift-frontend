import { apiService } from '../services/ApiService';

export default class ProductsStore {
  constructor() {
    this.listeners = new Set();

    this.pageNumbers = [];

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

    const { products, pageNumber } = await apiService.fetchProducts();

    this.products = products;

    this.pageNumbers = [...Array(pageNumber)].map((number, index) => index + 1);

    this.publish();
  }

  async changePageNumber(number) {
    this.products = [];

    this.products = await apiService.changePageNumber(number);
    this.publish();
  }
}

export const productsStore = new ProductsStore();
