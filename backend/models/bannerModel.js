/*
{
  "image": "/img/hero2.jpg",
  "title": "Kids Eye Care",
  "subtitle": "Gentle & friendly",
  "buttonText": "Learn more",
  "buttonLink": "/services/kids",
  "order": 2,
  "isActive": false
}

*/

let banners = [];
let nextId = 1;

const nowISO = () => new Date().toISOString();

const toBool = (v) => ["true", "1", true, 1, "on"].includes(v);

function getAll({ active, q } = {}) {
  let data = [...banners];

  if (active !== undefined) data = data.filter(b => b.isActive === toBool(active));
  if (q) {
    const kw = String(q).toLowerCase();
    data = data.filter(b =>
      (b.title || "").toLowerCase().includes(kw) ||
      (b.subtitle || "").toLowerCase().includes(kw)
    );
  }

  // newest first
  return data.sort(
    (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime) || b.bannerId - a.bannerId
  );
}

function findById(id) {
  return banners.find(b => b.bannerId === Number(id)) || null;
}

function addOne(payload, creator = "api") {
  const { image, title, subtitle, buttonText, buttonLink, order, isActive = true } = payload || {};
  if (!image || !title) return null;

  const maxOrder = banners.reduce((m, x) => Math.max(m, x.order ?? 0), 0);
  const resolvedOrder = (order === 0 || order) ? Number(order) : maxOrder + 1;

  const b = {
    bannerId: nextId++,
    image,
    title,
    subtitle: subtitle || "",
    buttonText: buttonText || "",
    buttonLink: buttonLink || "",
    order: resolvedOrder,
    isActive: Boolean(isActive),
    createdDateTime: nowISO(),
    createdBy: creator,
    modifiedDateTime: null,
    modifiedBy: null,
  };
  banners.push(b);
  return b;
}

function updateOneById(id, data, modifier = "api") {
  const b = findById(id);
  if (!b) return null;

  const editable = ["image","title","subtitle","buttonText","buttonLink","order","isActive"];
  editable.forEach(k => {
    if (data[k] !== undefined) {
      if (k === "order") b[k] = Number(data[k]);
      else if (k === "isActive") b[k] = Boolean(data[k]);
      else b[k] = data[k];
    }
  });

  b.modifiedDateTime = nowISO();
  b.modifiedBy = modifier;
  return b;
}

function deleteOneById(id) {
  const before = banners.length;
  banners = banners.filter(b => b.bannerId !== Number(id));
  return banners.length < before;
}

// toggle on/off active
function toggleActive(id) {
  const b = findById(id);
  if (!b) return null;
  b.isActive = !b.isActive;
  b.modifiedDateTime = nowISO();
  b.modifiedBy = "api";
  return b;
}

// [{id, order}]
function bulkReorder(pairs = []) {
  const idSet = new Set(banners.map(b => b.bannerId));
  for (const p of pairs) {
    if (!p || p.id === undefined || p.order === undefined) return null;
    if (!idSet.has(Number(p.id))) return null;
  }
  pairs.forEach(({ id, order }) => {
    const b = findById(id);
    if (b) b.order = Number(order);
  });
  return getAll();
}

module.exports = {
  getAll, findById, addOne, updateOneById, deleteOneById, toggleActive, bulkReorder
};
