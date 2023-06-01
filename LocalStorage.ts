class LocalStorage {
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string, defaultValue: T): T {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue) as T;
    }
    return defaultValue;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  ensureItem(key: string, defaultValue: any): void {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
  }

  clear(): void {
    localStorage.clear();
  }
}
