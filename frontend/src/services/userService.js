const BASE = "/api/users";

export const getUsers = async (search = "", role = "", status = "") => {
  const query = new URLSearchParams();

  if (search) query.append("q", search);
  if (role) query.append("role", role);
  if (status) query.append("status", status);

  const res = await fetch(`${BASE}?${query.toString()}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
};

export const getUserById = async (id) => {
  const res = await fetch(`${BASE}/${id}`, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to load user id = ${id}`);
  return res.json();
};

// ---------- ADMIN CRUD ----------
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmViMDU3OGY5MTY2MWE0NjQ1N2E4MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0NjY3NDc5LCJleHAiOjE3NjQ5MjY2Nzl9.MP0b-k35lF2PHlUJK1fjVdS4yCyTvTTuueRZtqQ4EOo';

export const createUser = async (data) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
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
      "Authorization": `Bearer ${token}`
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
      "Authorization": `Bearer ${token}`
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
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ toggleStatus: true }),
  });

  if (!res.ok) throw new Error("Failed to update user status");
  return res.json();
};
