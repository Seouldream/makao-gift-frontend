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
}

export const apiService = new ApiService();
