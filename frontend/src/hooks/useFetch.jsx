import { useState, useEffect, useCallback, useRef } from "react";

const useFetch = (url, options = {}, { auto = true } = {}) => {
  const stableOptions = useRef(options);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState(null);

  const execute = useCallback(async (override = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        ...stableOptions.current,
        ...override,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || `Error: ${response.status}`);
      }

      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (auto) execute();
  }, [auto, execute]);

  return { data, loading, error, execute };
};

export default useFetch;
