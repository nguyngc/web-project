import { getToken } from "../hooks/useLogin";

const BASE = "/api/services";

export const getServices = async (query = "") => {
  const res = await fetch(`${BASE}?${query}`);
  if (!res.ok) throw new Error("Failed to load services");
  return res.json();
};

export const getServiceById = async (id) => {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(`Failed to load service id = ${id}`);
  return res.json();
};

// ---------- ADMIN CRUD ----------
export const createService = async (data) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create new service");
  return res.json();
};

export const updateService = async (id, data) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update service");
  return res.json();
};

export const deleteService = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  
  if (!res.ok) throw new Error("Failed to delete service");
  return res.json();
};

export const toggleService = async (id) => {
  const res = await fetch(`${BASE}/${id}/toggle`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    },
  });
  
  if (!res.ok) throw new Error("Failed to change status of service");
  return res.json();
};
