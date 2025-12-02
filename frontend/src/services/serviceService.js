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
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmViMDU3OGY5MTY2MWE0NjQ1N2E4MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0NjY3NDc5LCJleHAiOjE3NjQ5MjY2Nzl9.MP0b-k35lF2PHlUJK1fjVdS4yCyTvTTuueRZtqQ4EOo';

export const createService = async (data) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
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
      "Authorization": `Bearer ${token}`
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
      "Authorization": `Bearer ${token}`
    }
  });
  
  if (!res.ok) throw new Error("Failed to delete service");
  return res.json();
};

export const toggleService = async (id) => {
  const res = await fetch(`${BASE}/${id}/toggle`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  
  if (!res.ok) throw new Error("Failed to change status of service");
  return res.json();
};
