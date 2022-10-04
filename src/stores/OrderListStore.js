import { apiService } from '../services/ApiService';

export default class OrderListStore {
  constructor() {
    this.listeners = new Set();

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

  fetchOrderList() {
    this.orderList = [];
    this.publish();

    this.orderList = [
      {
        id: 1,
        quantity: 2,
        amount: 2000,
        date: '2022-10-01',
        recipient: '김두한',
        address: '서울시 한강다리 및 B102호',
        message: '잘해라 슙새야',
        brand: 'cup-maker',
        name: 'mug',
      },
      {
        id: 2,
        quantity: 1,
        amount: 10,
        date: '2022-10-03',
        recipient: '나믿고',
        address: '서울시 한강 물 속 B802호',
        message: '잘살아 개년아 ㅠㅠㅠ 나 먼저 간다.',
        brand: 'petShop',
        name: 'fuckingCandy',
      },
    ];
    this.publish();
  }
}

export const orderListStore = new OrderListStore();
