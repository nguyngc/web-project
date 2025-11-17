const mongoose = require("mongoose");
const Service = require("../models/serviceModel");

const toBool = (v) => ["true", "1", true, 1, "on"].includes(v);

const getAll = async (req, res) => {
  const { q, isActive } = req.query;

  try {
    const filter = {};

    if (isActive !== undefined) filter.isActive = toBool(isActive);
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ serviceName: regex }, { shortDescription: regex }, { fullDescription: regex }];
    }

    const services = await Service.find(filter).sort({ createdDateTime: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve services" });
  }
};

const getById = async (req, res) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ message: "Invalid Service ID" });
  }

  try {
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve service" });
  }
};

const create = async (req, res) => {
  try {
    const { serviceName } = req.body;

    if (!serviceName) {
      return res.status(400).json({ message: "serviceName is required" });
    }

    const service = await Service.create(req.body);

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to create service" });
  }
};

const update = async (req, res) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ message: "Invalid Service ID" });
  }

  try {
    const updated = await Service.findByIdAndUpdate(serviceId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Service not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update service" });
  }
};

const remove = async (req, res) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ message: "Invalid Service ID" });
  }

  try {
    const deleted = await Service.findByIdAndDelete(serviceId);
    if (!deleted) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete service" });
  }
};

// toggle isActive
const toggle = async (req, res) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ message: "Invalid Service ID" });
  }

  try {
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.isActive = !service.isActive;
    await service.save();

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle service" });
  }
};

module.exports = { getAll, getById, create, update, remove, toggle };
