'use client'
import { useState } from "react";

interface UseLocalStorageProps<T> {
  key: string;
  initialValue: T;
}

const useLocalStorage = <T>({ key, initialValue }: UseLocalStorageProps<T>): [T, (value: T | ((val: T) => T)) => void] => {
  

  const [state, setState] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      if (typeof window !== "undefined") {
      const valueToStore = value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(valueToStore);
    }

    } catch (error) {
      console.error(error);
    }
  };
console.log(state,setValue);
  return [state, setValue];
};

export default useLocalStorage;
