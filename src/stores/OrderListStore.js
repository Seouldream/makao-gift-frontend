import { apiService } from '../services/ApiService';

export default class OrderListStore {
  constructor() {
    this.listeners = new Set();

    this.pageNumbers = [];

    this.orders = [];

    this.orderState = '';
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

    const { orders, pageNumber } = await apiService.fetchOrderList();

    this.orders = orders;

    this.pageNumbers = [...Array(pageNumber)].map((number, index) => index + 1);

    this.publish();
  }

  async requestPlaceAnOrder({
    recipient,
    address,
    message,
    productId,
    quantity,
    amount,
  }) {
    this.changeOrderState('processing');

    try {
      await apiService.createAnOrder({
        recipient,
        address,
        message,
        productId,
        quantity,
        amount,
      });
      this.changeOrderState('success');
    } catch (e) {
      const { errorMessage } = e.response.data;
      if (errorMessage === '잔액이 부족합니다.') {
        this.changePlacingAnOrderState('insufficientAmount', { errorMessage });
      }
    }
  }

  changeOrderState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.orderState = state;
    this.publish();
  }

  async changePageNumber(number) {
    this.orders = [];

    this.orders = await apiService.changePageNumber(number);
    this.publish();
  }
}

export const orderListStore = new OrderListStore();
