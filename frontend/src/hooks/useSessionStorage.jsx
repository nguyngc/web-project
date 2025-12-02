import { useState, useEffect, useCallback } from "react";

const useSessionStorage = (key, initialValue = null) => {
  const readValue = useCallback(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading sessionStorage key:", key, error);
      return initialValue;
    }
  }, [key]);

  // Store the initial value
  const [value, setValue] = useState(() => readValue());

  // Save value to state + sessionStorage
  const setItem = useCallback((newValue) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error("Error setting sessionStorage key:", key, error);
    }
  },
    [key]
  );

  // Force reload from sessionStorage
  const getItem = useCallback(() => {
    const val = readValue();
    setValue(val);
    return val;
  }, [readValue]);

  // Remove item from sessionStorage + reset state
  const removeItem = useCallback(() => {
    try {
      sessionStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error("Error removing sessionStorage key:", key, error);
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
export default useSessionStorage;
