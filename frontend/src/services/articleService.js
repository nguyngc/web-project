import { getToken } from "../hooks/useLogin";

const BASE = "/api/articles";

// Normalize _id → id and createdDateTime → date
const normalizeArticle = (a) => ({
  ...a,
  id: a.id || a._id,
  date: a.createdDateTime
    ? new Date(a.createdDateTime).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : "",
});

// GET /api/articles
export const fetchArticles = async (params = {}) => {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
  );

  const query = new URLSearchParams(clean).toString();

  const res = await fetch(`${BASE}?${query}`);
  if (!res.ok) throw new Error("Failed to load articles");

  const data = await res.json();
  return data.map(normalizeArticle);
};

// GET /api/articles/:id
export const fetchArticleById = async (id) => {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Article not found");

  const data = await res.json();
  return normalizeArticle(data);
};

// ---------- ADMIN CRUD ----------
export const getAdminArticles = async (q = "") => {
  const params = {};
  if (q) params.q = q;

  const res = await fetch(`${BASE}?${new URLSearchParams(params)}`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  if (!res.ok) throw new Error("Failed to load articles");

  const data = await res.json();
  return data.map(normalizeArticle);
};

export const createArticle = async (form) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) throw new Error("Failed to create article");
  const data = await res.json();
  return normalizeArticle(data);
};

export const updateArticle = async (id, form) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) throw new Error("Failed to update article");
  const data = await res.json();
  return normalizeArticle(data);
};

export const deleteArticle = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  if (!res.ok) throw new Error("Failed to delete article");
  return res.json();
};

export const toggleArticleStatus = async (id, currentStatus) => {
  // just update isPublished
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ isPublished: !currentStatus }),
  });

  if (!res.ok) throw new Error("Failed to update article status");
  const data = await res.json();
  return normalizeArticle(data);
};
