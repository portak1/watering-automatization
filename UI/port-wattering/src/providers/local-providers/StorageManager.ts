export class StorageManager {
  setLocalStorage(key: string, value: string | number): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  getLocalStorage(key: string, initialValue: string | number): string | number {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      // if error, return initial value
      return initialValue;
    }
  }
}
