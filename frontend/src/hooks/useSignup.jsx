import { useState } from "react";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (object) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Signup failed:", data.error);
        setError(data.error || "Signup failed");
        setIsLoading(false);
        return null;
      }

      // save user and token
      if (data.token) {
        sessionStorage.setItem("token", data.token);
      }
      sessionStorage.setItem("user", JSON.stringify(data.user || data));

      setIsLoading(false);
      return data; //component use
    } catch (err) {
      setError("Network error");
      setIsLoading(false);
      return null;
    }
  };

  return { signup, isLoading, error };
}
