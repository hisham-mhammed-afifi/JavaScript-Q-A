class Utils {
  editJSONValue(jsonString: string, key: string, newValue: any): string {
    try {
      const parsedJson = JSON.parse(jsonString);
      parsedJson[key] = newValue;
      return JSON.stringify(parsedJson);
    } catch (error) {
      console.error("Error editing JSON value:", error);
      return jsonString;
    }
  }

  getUniqueObjects<T>(arr: T[], prop: string): T[] {
    const uniqueMap = new Map();
    const uniqueArray: T[] = [];
    for (let obj of arr) {
      if (!uniqueMap.has(obj[prop])) {
        uniqueMap.set(obj[prop], true);
        uniqueArray.push(obj);
      }
    }
    return uniqueArray;
  }

  getUniqueElements<T>(arr: T[]): T[] {
    const uniqueSet = new Set(arr.map((obj) => JSON.stringify(obj)));
    const uniqueArray = Array.from(uniqueSet).map((jsonString) =>
      JSON.parse(jsonString)
    );
    return uniqueArray;
  }

  generateNewName(existingNames: string[], baseName: string): string {
    let newName = baseName;
    let count = 0;
    if (existingNames.includes(baseName)) {
      while (existingNames.includes(`${baseName} ${count}`)) {
        count++;
      }
      newName = `${baseName} ${count}`;
    }
    return newName;
  }

  moveElementToTop<T>(arr: T[], element: T): T[] {
    const index = arr.indexOf(element);
    if (index !== -1) {
      arr.splice(index, 1);
      arr.unshift(element);
    }
    return arr;
  }

  evaluateCondition(
    value: number,
    condition: (value: number) => boolean
  ): boolean {
    return condition(value);
  }

  addUniqueIds(array: { [key: string]: any }[]): void {
    array.forEach((element, index) => {
      if (!element.hasOwnProperty("id")) {
        Object.defineProperty(element, "id", {
          value: `id_${index}`,
          writable: false,
          enumerable: true,
          configurable: true,
        });
      }
    });
  }

  isObject(element: any): boolean {
    return (
      typeof element === "object" && element !== null && !Array.isArray(element)
    );
  }

  debounce(func: Function, delay: number): Function {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }

  throttle(func: Function, limit: number): Function {
    let lastExecutionTime = 0;
    return function (...args: any[]) {
      const now = Date.now();
      if (now - lastExecutionTime >= limit) {
        func.apply(null, args);
        lastExecutionTime = now;
      }
    };
  }

  isEmpty(value: any): boolean {
    if (Array.isArray(value) || typeof value === "string") {
      return value.length === 0;
    }
    if (typeof value === "object" && value !== null) {
      return Object.keys(value).length === 0;
    }
    return true;
  }

  shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    return keys.reduce((result, key) => {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key];
      }
      return result;
    }, {} as Pick<T, K>);
  }

  parseQueryString(queryString: string): Record<string, string> {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
    return array.reduce((result, current) => {
      const groupKey = String(current[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(current);
      return result;
    }, {} as Record<string, T[]>);
  }

  sortBy<T, K extends keyof T>(array: T[], key: K): T[] {
    return array.slice().sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  }
}
