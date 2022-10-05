/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
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
    const url = `${baseUrl}/signup`;

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

    const { data } = await axios.get(url);

    return {
      id: data.id,
      userId: data.userId,
      name: data.name,
      amount: data.amount,
    };
  }

  async fetchProducts() {
    const url = `${baseUrl}/products`;

    const { data } = await axios.get(url);
    const { products } = data;

    return products;
  }

  async fetchOrderList() {
    const url = `${baseUrl}/orders`;

    const { data } = await axios.get(url);
    const { orders } = data;

    return orders;
  }
}

export const apiService = new ApiService();
