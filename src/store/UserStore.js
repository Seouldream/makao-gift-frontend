export default class UserStore {
  constructor() {
    this.name = '';
    this.id = '';
    this.amount = 0;
    this.orderList = [];
  }

  login({ userId, password }) {
    // TODo 서버에서 가져옴

    if (userId !== 'makaoKim') {
      return;
    }
    this.name = '마카오김';
    this.amount = 50_000;
  }
}
