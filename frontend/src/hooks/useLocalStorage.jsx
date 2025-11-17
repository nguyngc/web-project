import { useState, useEffect, useCallback } from "react";

export const useLocalStorage = (key, initialValue = null) => {
  const readValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  }, [key]);

  // Store the initial value
  const [value, setValue] = useState(() => readValue());

  // Save value to state + localStorage
  const setItem = useCallback((newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  },
    [key]
  );

  // Force reload from localStorage
  const getItem = useCallback(() => {
    const val = readValue();
    setValue(val);
    return val;
  }, [readValue]);

  // Remove item from localStorage + reset state
  const removeItem = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error("Error removing localStorage key:", key, error);
    }
  }, [key]);

  // Sync when storage changes in another tab or on login event
  useEffect(() => {
    const handleStorage = () => {
      getItem();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("userLogin", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("userLogin", handleStorage);
    };
  }, [getItem]);

  return { value, setItem, getItem, removeItem };
};
