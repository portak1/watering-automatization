import { StorageManager } from './StorageManager';

export class UserStorage {
  public storageManager: StorageManager = new StorageManager();

  //setting

  setUserToken(token: string): void {
    this.storageManager.setLocalStorage('token', token);
  }

  setUserName(name: string): void {
    this.storageManager.setLocalStorage('name', name);
  }

  setUserId(id: number): void {
    this.storageManager.setLocalStorage('id', id);
  }

  setUserNumber(userNumber: string): void {
    this.storageManager.setLocalStorage('user_nubmer', userNumber);
  }

  //getting
  getUsertoken(): string | number {
    return this.storageManager.getLocalStorage('token', '');
  }

  getUserName(): string | number {
    return this.storageManager.getLocalStorage('name', '');
  }

  getUserId(): string | number {
    return this.storageManager.getLocalStorage('id', 0);
  }

  getUserNumber(): string | number {
    return this.storageManager.getLocalStorage('user_number', '');
  }

  //addition functions
  clearUserStorage(): void {
    this.setUserId(0);
    this.setUserName('');
    this.setUserNumber('');
    this.setUserToken('');
  }
}
