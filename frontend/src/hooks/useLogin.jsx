import { useState } from "react";

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setIsLoading(false);
        return null;
      }

      // save JWT token and user into sessionStorage
      if (data.token) {
        sessionStorage.setItem("token", data.token);
      }
      sessionStorage.setItem("user", JSON.stringify(data.user || data));

      setIsLoading(false);
      return data; //
    } catch (err) {
      setError("Network error");
      setIsLoading(false);
      return null;
    }
  };

  return { login, isLoading, error };
}
