let articles = [];
let nextId = 1;

const nowISO = () => new Date().toISOString();
const toBool = (v) => ["true", "1", true, 1, "on"].includes(v);

function getAll({ published, q } = {}) {
  let data = [...articles];
  if (published !== undefined) data = data.filter(a => a.isPublished === toBool(published));
  if (q) {
    const kw = String(q).toLowerCase();
    data = data.filter(a =>
      (a.title || "").toLowerCase().includes(kw) ||
      (a.subtitle || "").toLowerCase().includes(kw) ||
      (a.authorBio || "").toLowerCase().includes(kw)
    );
  }
  return data.sort((a, b) =>
    new Date(b.createdDateTime) - new Date(a.createdDateTime) || b.articleId - a.articleId
  );
}

function findById(id) {
  return articles.find(a => a.articleId === Number(id)) || null;
}

function addOne(payload, creator = "api") {
  const { categoryId, title, subtitle, authorBio, thumbnailImage, content, isPublished = false } = payload || {};
  if (!title || !content) return null;

  const a = {
    articleId: nextId++,
    categoryId: categoryId || null,
    title,
    subtitle: subtitle || "",
    authorBio: authorBio || "",
    thumbnailImage: thumbnailImage || "",
    content,
    isPublished: Boolean(isPublished),
    createdDateTime: nowISO(),
    createdBy: creator,
    modifiedDateTime: null,
    modifiedBy: null,
  };
  articles.push(a);
  return a;
}

function updateOneById(id, data, modifier = "api") {
  const a = findById(id);
  if (!a) return null;

  const editable = ["categoryId", "title", "subtitle", "authorBio", "thumbnailImage", "content", "isPublished"];
  editable.forEach(k => {
    if (data[k] !== undefined) {
      if (k === "isPublished") a[k] = Boolean(data[k]);
      else a[k] = data[k];
    }
  });
  a.modifiedDateTime = nowISO();
  a.modifiedBy = modifier;
  return a;
}

function deleteOneById(id) {
  const before = articles.length;
  articles = articles.filter(a => a.articleId !== Number(id));
  return articles.length < before;
}

function togglePublished(id) {
  const a = findById(id);
  if (!a) return null;
  a.isPublished = !a.isPublished;
  a.modifiedDateTime = nowISO();
  a.modifiedBy = "api";
  return a;
}

module.exports = { getAll, findById, addOne, updateOneById, deleteOneById, togglePublished };