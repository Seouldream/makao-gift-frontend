export default class ImageStore {
  constructor() {
    this.listeners = new Set();

    this.imageNames = [];
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

  async fetchImages() {
    this.imageNames = {
      firstId: 1,
      secondId: 2,
    };

    this.publish();
  }
}

export const imageStore = new ImageStore();
