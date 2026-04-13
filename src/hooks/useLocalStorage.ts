'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T | null, (value: T | null) => void] {
  const [storedValue, setStoredValue] = useState<T | null>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // 从 localStorage 读取数据
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
      setIsInitialized(true);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      setIsInitialized(true);
    }
  }, [key]);

  // 保存数据到 localStorage
  const setValue = useCallback((value: T | null) => {
    try {
      setStoredValue(value);
      if (value === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [isInitialized ? storedValue : null, setValue];
}
