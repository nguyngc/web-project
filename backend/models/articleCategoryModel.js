let categories = [];
let nextId = 1;

function getAll({ q } = {}) {
  let data = [...categories];
  if (q) {
    const kw = String(q).toLowerCase();
    data = data.filter(c => (c.name || "").toLowerCase().includes(kw));
  }
  return data.sort((a, b) => a.categoryId - b.categoryId);
}

function findById(id) {
  return categories.find(c => c.categoryId === Number(id)) || null;
}

function addOne(payload) {
  const { name } = payload || {};
  if (!name) return null;
  const c = { categoryId: nextId++, name };
  categories.push(c);
  return c;
}

function updateOneById(id, data) {
  const c = findById(id);
  if (!c) return null;
  if (data.name !== undefined) c.name = data.name;
  return c;
}

function deleteOneById(id) {
  const before = categories.length;
  categories = categories.filter(c => c.categoryId !== Number(id));
  return categories.length < before;
}

module.exports = { getAll, findById, addOne, updateOneById, deleteOneById };