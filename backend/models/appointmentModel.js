let appointments = [];
let nextId = 1;

const nowISO = () => new Date().toISOString();

function getAll({ status, q } = {}) {
  let data = [...appointments];
  if (status) data = data.filter(a => a.status === status);
  if (q) {
    const kw = String(q).toLowerCase();
    data = data.filter(a =>
      (a.customerName || "").toLowerCase().includes(kw) ||
      (a.customerPhone || "").toLowerCase().includes(kw)
    );
  }
  return data.sort((a, b) =>
    new Date(b.createdDateTime) - new Date(a.createdDateTime) || b.appointmentId - a.appointmentId
  );
}

function findById(id) {
  return appointments.find(a => a.appointmentId === Number(id)) || null;
}

function addOne(payload, creator = "api") {
  const { customerName, customerPhone, customerEmail, serviceId, appointmentDateTime, notes, status = "Pending" } = payload || {};
  if (!customerName || !customerPhone || !serviceId || !appointmentDateTime) return null;

  const a = {
    appointmentId: nextId++,
    customerName,
    customerPhone,
    customerEmail: customerEmail || "",
    serviceId: Number(serviceId),
    appointmentDateTime,
    notes: notes || "",
    status,
    createdDateTime: nowISO(),
    createdBy: creator,
    modifiedDateTime: null,
    modifiedBy: null,
  };
  appointments.push(a);
  return a;
}

function updateOneById(id, data, modifier = "api") {
  const a = findById(id);
  if (!a) return null;

  const editable = ["customerName", "customerPhone", "customerEmail", "serviceId", "appointmentDateTime", "notes", "status"];
  editable.forEach(k => {
    if (data[k] !== undefined) {
      if (k === "serviceId") a[k] = Number(data[k]);
      else a[k] = data[k];
    }
  });
  a.modifiedDateTime = nowISO();
  a.modifiedBy = modifier;
  return a;
}

function deleteOneById(id) {
  const before = appointments.length;
  appointments = appointments.filter(a => a.appointmentId !== Number(id));
  return appointments.length < before;
}

module.exports = { getAll, findById, addOne, updateOneById, deleteOneById };