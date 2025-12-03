import { getToken } from "../hooks/useLogin";

const BASE = "/api/banners";

export const getAllBanners = async () => {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to load banners");
  return res.json();
};

// ---------- ADMIN CRUD ----------
export const createBanner = async (form) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) throw new Error("Failed to create banner");
  return res.json();
};

export const updateBanner = async (id, form) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) throw new Error("Failed to update banner");
  return res.json();
};

export const toggleBanner = async (id) => {
  const res = await fetch(`${BASE}/${id}/toggle`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    },
  });

  if (!res.ok) throw new Error("Failed to toggle status");
  return res.json();
};

export const deleteBanner = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    },
  });

  if (!res.ok) throw new Error("Failed to delete banner");
  return res.json();
};

export const reorderBanners = async (list) => {
  const payload = list.map((b, i) => ({
    id: b._id,
    order: i + 1,
  }));

  const res = await fetch(`${BASE}/reorder`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to reorder banners");
  return res.json();
};
