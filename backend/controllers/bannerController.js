const Banner = require("../models/bannerModel");

const toBool = (v) => ["true", "1", true, 1, "on"].includes(v);

// GET /api/banners?active=true&q=kw
const getAll = async (req, res) => {
  try {
    const { active, q } = req.query;
    const filter = {};

    if (active !== undefined) {
      filter.isActive = toBool(active);
    }

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ title: regex }, { subtitle: regex }];
    }

    const list = await Banner.find(filter).sort({ order: 1 });
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve banners" });
  }
};

// GET /api/banners/:bannerId
const getById = async (req, res) => {
  try {
    const b = await Banner.findById(req.params.bannerId);
    if (!b) return res.status(404).json({ message: "Banner not found" });
    res.json(b);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid banner id" });
  }
};

// POST /api/banners
const create = async (req, res) => {
  try {
    const {
      badge,
      image,
      title,
      subtitle,
      buttonText,
      buttonLink,
      order,
      isActive,
    } = req.body || {};

    if (!image || !title) {
      return res
        .status(400)
        .json({ message: "image & title are required" });
    }

    let resolvedOrder = order;
    if (resolvedOrder === undefined || resolvedOrder === null) {
      const last = await Banner.findOne().sort({ order: -1 }).lean();
      resolvedOrder = last ? last.order + 1 : 1;
    }

    const created = await Banner.create({
      badge,
      image,
      title,
      subtitle: subtitle || "",
      buttonText: buttonText || "",
      buttonLink: buttonLink || "",
      order: Number(resolvedOrder),
      isActive:
        isActive !== undefined ? toBool(isActive) : true,
      createdBy: req.user?.id || "api",
    });

    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create banner" });
  }
};

// PUT /api/banners/:bannerId
const update = async (req, res) => {
  try {
    const data = { ...req.body, modifiedBy: req.user?.id || "api" };

    if (data.order !== undefined) data.order = Number(data.order);
    if (data.isActive !== undefined) data.isActive = toBool(data.isActive);

    const updated = await Banner.findByIdAndUpdate(
      req.params.bannerId,
      data,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Banner not found" });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid banner id" });
  }
};

// DELETE /api/banners/:bannerId
const remove = async (req, res) => {
  try {
    const deleted = await Banner.findByIdAndDelete(req.params.bannerId);
    if (!deleted)
      return res.status(404).json({ message: "Banner not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid banner id" });
  }
};

// PATCH /api/banners/:bannerId/toggle
const toggle = async (req, res) => {
  try {
    const b = await Banner.findById(req.params.bannerId);
    if (!b) return res.status(404).json({ message: "Banner not found" });

    b.isActive = !b.isActive;
    b.modifiedBy = req.user?.id || "api";
    await b.save();

    res.json(b);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid banner id" });
  }
};

// PUT /api/banners/reorder   body = [{ id, order }, ...]
const reorder = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res
        .status(400)
        .json({ message: "Body must be an array [{id, order}]" });
    }

    const pairs = req.body;

    for (const p of pairs) {
      if (!p || !p.id || p.order === undefined) {
        return res.status(400).json({ message: "Invalid ids/orders" });
      }
    }

    await Promise.all(
      pairs.map((p) =>
        Banner.findByIdAndUpdate(p.id, { order: Number(p.order) })
      )
    );

    const list = await Banner.find().sort({ order: 1 });
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reorder banners" });
  }
};

module.exports = { getAll, getById, create, update, remove, toggle, reorder };
