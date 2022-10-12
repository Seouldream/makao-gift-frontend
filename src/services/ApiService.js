/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async postSession({ userId, password }) {
    const url = `${baseUrl}/session`;
    const { data } = await axios.post(url, { userId, password });
    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async createUser({
    userId, name, password, confirmPassword,
  }) {
    const url = `${baseUrl}/register`;

    const { data } = await axios.post(url, {
      userId, name, password, confirmPassword,
    });
    return {
      userId: data.userId,
      name: data.name,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
  }

  async fetchUser() {
    const url = `${baseUrl}/users/me`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    const {
      userId, name, amount,
    } = data;

    return {
      userId, name, amount,
    };
  }

  async fetchProducts() {
    const url = `${baseUrl}/products`;

    const { data } = await axios.get(url);

    const { products, pageNumber } = data;

    return { products, pageNumber };
  }

  async fetchOrderList() {
    const url = `${baseUrl}/orders`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const { orders, pageNumber } = data;
    return { orders, pageNumber };
  }

  async createAnOrder({
    recipient,
    address,
    message,
    productId,
    quantity,
    amount,
  }) {
    const url = `${baseUrl}/orders`;
    await axios.post(url, {
      recipient,
      address,
      message,
      productId,
      quantity,
      amount,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async changePageNumber(number) {
    const url = `${baseUrl}/products`;

    const { data } = await axios.get(url, {
      params: {
        page: number,
      },
    });

    return data.products;
  }

  async changeOrderPageNumber(number) {
    const url = `${baseUrl}/orders`;

    const { data } = await axios.get(url, {
      params: {
        page: number,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.orders;
  }
}

export const apiService = new ApiService();
