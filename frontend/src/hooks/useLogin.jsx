import { useState } from "react";

// helper để lưu và lấy token
const saveToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};

const saveUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials, rememberMe = false) => {
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

      if (data.token) {
        // xoá token cũ trước khi lưu
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        saveToken(data.token, rememberMe);
        console.log("Login response:", data);
      }
      

      if (data.user) {
        saveUser(data.user);
      }

      setIsLoading(false);
      return data;
    } catch (err) {
      setError("Network error");
      setIsLoading(false);
      return null;
    }
  };

  return { login, isLoading, error };
}

// import { useState } from "react";

// export default function useLogin(url) {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const login = async (credentials) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "Login failed");
//         setIsLoading(false);
//         return null;
//       }

//       // save JWT token and user into localStorage
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }
//       localStorage.setItem("user", JSON.stringify(data.user || data));

//       setIsLoading(false);
//       return data; //
//     } catch (err) {
//       setError("Network error");
//       setIsLoading(false);
//       return null;
//     }
//   };

//   return { login, isLoading, error };
// }
