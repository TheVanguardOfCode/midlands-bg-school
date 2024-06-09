import { getLocalStorageData, setLocalStorageData, removeLocalStorageData } from './local-storage-util';

describe('localStorageHelpers', () => {
  beforeEach(() => {
    // Clear mocks before each test
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  describe('getLocalStorageData', () => {
    it('should return data if it exists in localStorage', () => {
      const dataKey = 'testKey';
      const dataValue = 'testValue';
      localStorage.setItem(dataKey, dataValue);

      const result = getLocalStorageData(dataKey);
      expect(result).toBe(dataValue);
    });

    it('should return null if data does not exist in localStorage', () => {
      const dataKey = 'nonExistentKey';

      const result = getLocalStorageData(dataKey);
      expect(result).not.toBeNull();
    });
  });

  describe('setLocalStorageData', () => {
    it('should set data in localStorage', () => {
      const dataKey = 'testKey';
      const dataValue = { name: 'test' };

      setLocalStorageData(dataKey, dataValue);

      const storedValue = localStorage.getItem(dataKey);
      expect(storedValue).toBe(JSON.stringify(dataValue));
    });
  });

  describe('removeLocalStorageData', () => {
    it('should remove data from sessionStorage', () => {
      const dataKey = 'testKey';
      sessionStorage.setItem(dataKey, 'testValue');

      removeLocalStorageData(dataKey);

      const storedValue = sessionStorage.getItem(dataKey);
      expect(storedValue).toBeNull();
    });
  });
});
