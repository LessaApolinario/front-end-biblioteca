export function useLocalStorage<T>() {
  function setItem(key: string, value: string | T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  function getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) as T : null
  }

  function removeItem(key: string): void {
    localStorage.removeItem(key)
  }

  return {
    setItem,
    getItem,
    removeItem,
  }
}
