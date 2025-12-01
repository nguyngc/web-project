const BASE = "/api/banners";

export const getAllBanners = async () => {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to load banners");
  return res.json();
};

export const createBanner = async (form) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) throw new Error("Failed to create banner");
  return res.json();
};

export const updateBanner = async (id, form) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) throw new Error("Failed to update banner");
  return res.json();
};

export const toggleBanner = async (id) => {
  const res = await fetch(`${BASE}/${id}/toggle`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to toggle status");
  return res.json();
};

export const deleteBanner = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete banner");
  return res.json();
};

export const reorderBanners = async (list) => {
  const payload = list.map((b, i) => ({
    id: b.id,
    order: i + 1,
  }));

  const res = await fetch(`${BASE}/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to reorder banners");
  return res.json();
};
