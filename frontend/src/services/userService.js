import { getToken } from "../hooks/useLogin";

const BASE = "/api/users";

export const getUsers = async (search = "", role = "", status = "") => {
  const tokenValue = getToken();
  console.log("Token :", tokenValue);
  if (!tokenValue) throw new Error("Token not found!");

  const query = new URLSearchParams();

  if (search) query.append("q", search);
  if (role) query.append("role", role);
  if (status) query.append("status", status);

  const res = await fetch(`${BASE}?${query.toString()}`, {
    headers: {
      "Authorization": `Bearer ${tokenValue}`
    }
  });

  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
};

export const getUserById = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    },
    credentials: "include"
  });
  if (!res.ok) throw new Error(`Failed to load user id = ${id}`);
  return res.json();
};

// ---------- ADMIN CRUD ----------

export const createUser = async (data) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create new user");
  return res.json();
};

export const updateUser = async (id, data) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};

export const toggleStatus = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ toggleStatus: true }),
  });

  if (!res.ok) throw new Error("Failed to update user status");
  return res.json();
};
