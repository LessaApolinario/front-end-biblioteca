import { useCallback } from 'react';

export function useLocalStorage<T>() {
  const setItem = useCallback(
    (key: string, value: string | T) => setItemOnLocalStorage(key, value),
    [setItemOnLocalStorage]
  );

  function setItemOnLocalStorage(key: string, value: string | T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const getItem = useCallback(
    <T>(key: string) => getItemFromLocalStorage<T>(key),
    [getItemFromLocalStorage]
  );

  function getItemFromLocalStorage<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  const removeItem = useCallback(
    (key: string) => removeItemFromLocalStorage(key),
    [removeItemFromLocalStorage]
  );

  function removeItemFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  return {
    setItem,
    getItem,
    removeItem,
  };
}
