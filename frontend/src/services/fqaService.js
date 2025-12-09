import { getToken } from "../hooks/useLogin";

const BASE = "/api/faq";

export const getAllFqas = async (query = "") => {
  const res = await fetch(`${BASE}?${query}`);
  if (!res.ok) throw new Error("Failed to load fqas");
  return res.json();
};

export const getFqaById = async (id) => {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(`Failed to load fqa id = ${id}`);
  return res.json();
};

// ---------- ADMIN CRUD ----------
export const createFqa = async (data) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create new fqa");
  return res.json();
};

export const updateFqa = async (id, data) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update fqa");
  return res.json();
};

export const deleteFqa = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  
  if (!res.ok) throw new Error("Failed to delete fqa");
  return res.json();
};

