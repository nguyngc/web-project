import { useEffect, useState } from "react";

const useRole = () => {
  const [role, setRole] = useState(() => JSON.parse(localStorage.getItem("currentUser"))?.role || "user");

  useEffect(() => {
    const handleLogin = () => {
      setRole(JSON.parse(localStorage.getItem("currentUser"))?.role || "user");
    };
    window.addEventListener("userLogin", handleLogin);
    return () => window.removeEventListener("userLogin", handleLogin);
  }, []);

  return role;
}

export default useRole;