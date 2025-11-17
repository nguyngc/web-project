let services = [];
let nextId = 1;

const nowISO = () => new Date().toISOString();
const toBool = (v) => ["true", "1", true, 1, "on"].includes(v);

function getAll({ active, q } = {}) {
  let data = [...services];
  if (active !== undefined) data = data.filter(s => s.isActive === toBool(active));
  if (q) {
    const kw = String(q).toLowerCase();
    data = data.filter(s =>
      (s.serviceName || "").toLowerCase().includes(kw) ||
      (s.shortDescription || "").toLowerCase().includes(kw) ||
      (s.fullDescription || "").toLowerCase().includes(kw)
    );
  }
  return data.sort((a, b) =>
    new Date(b.createdDateTime) - new Date(a.createdDateTime) || b.serviceId - a.serviceId
  );
}

function findById(id) {
  return services.find(s => s.serviceId === Number(id)) || null;
}

function addOne(payload, creator = "api") {
  const { serviceName, shortDescription, fullDescription, image, duration, price, frequency, features, benefits, isActive = true } = payload || {};
  if (!serviceName || !price) return null;

  const s = {
    serviceId: nextId++,
    serviceName,
    shortDescription: shortDescription || "",
    fullDescription: fullDescription || "",
    image: image || "",
    duration: duration || "",
    price: Number(price),
    frequency: frequency || "",
    features: features || "",
    benefits: benefits || "",
    isActive: Boolean(isActive),
    createdDateTime: nowISO(),
    createdBy: creator,
    modifiedDateTime: null,
    modifiedBy: null,
  };
  services.push(s);
  return s;
}

function updateOneById(id, data, modifier = "api") {
  const s = findById(id);
  if (!s) return null;

  const editable = ["serviceName", "shortDescription", "fullDescription", "image", "duration", "price", "frequency", "features", "benefits", "isActive"];
  editable.forEach(k => {
    if (data[k] !== undefined) {
      if (k === "price") s[k] = Number(data[k]);
      else if (k === "isActive") s[k] = Boolean(data[k]);
      else s[k] = data[k];
    }
  });
  s.modifiedDateTime = nowISO();
  s.modifiedBy = modifier;
  return s;
}

function deleteOneById(id) {
  const before = services.length;
  services = services.filter(s => s.serviceId !== Number(id));
  return services.length < before;
}

function toggleActive(id) {
  const s = findById(id);
  if (!s) return null;
  s.isActive = !s.isActive;
  s.modifiedDateTime = nowISO();
  s.modifiedBy = "api";
  return s;
}

module.exports = { getAll, findById, addOne, updateOneById, deleteOneById, toggleActive };