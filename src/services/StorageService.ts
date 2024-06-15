import { Storage } from '@ionic/storage';

class StorageService {
  storage: Storage;

  constructor() {
    this.storage = new Storage();
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async setItem(key: string, value: any): Promise<void> {
    try {
      await this.storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item:', error);
      throw error;
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const result = await this.storage.get(key);
      if (result) {
        return JSON.parse(result) as T;
      }
      return null;
    } catch (error) {
      console.error('Error getting item:', error);
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.storage.remove(key);
    } catch (error) {
      console.error('Error removing item:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await this.storage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }
}

const storageService = new StorageService();
export default storageService;