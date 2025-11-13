const mongoose = require("mongoose");
const FAQ = require("../models/faqModel");

// GET /faqs?q=keyword
const getAll = async (req, res) => {
  const { q } = req.query;

  try {
    const filter = {};

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ question: regex }, { answer: regex }];
    }

    const faqs = await FAQ.find(filter).sort({ createdAt: -1 });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve FAQs" });
  }
};

// GET /faqs/:faqId
const getById = async (req, res) => {
  const { faqId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(faqId)) {
    return res.status(400).json({ message: "Invalid FAQ ID" });
  }

  try {
    const faq = await FAQ.findById(faqId);

    if (faq) {
      res.status(200).json(faq);
    } else {
      res.status(404).json({ message: "FAQ not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve FAQ" });
  }
};

// POST /faqs
const create = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "question & answer are required" });
    }

    const createdBy = req.body.createdBy || req.user?.id || "api";

    const faq = await FAQ.create({
      question,
      answer,
      createdBy
    });

    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Failed to create FAQ" });
  }
};

// PUT /faqs/:faqId
const update = async (req, res) => {
  const { faqId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(faqId)) {
    return res.status(400).json({ message: "Invalid FAQ ID" });
  }

  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      faqId,
      req.body,
      { new: true }
    );

    if (updatedFAQ) {
      res.status(200).json(updatedFAQ);
    } else {
      res.status(404).json({ message: "FAQ not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update FAQ" });
  }
};

// DELETE /faqs/:faqId
const remove = async (req, res) => {
  const { faqId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(faqId)) {
    return res.status(400).json({ message: "Invalid FAQ ID" });
  }

  try {
    const deleted = await FAQ.findByIdAndDelete(faqId);

    if (deleted) {
      res.status(200).json({ message: "Deleted" });
    } else {
      res.status(404).json({ message: "FAQ not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete FAQ" });
  }
};

module.exports = { getAll, getById, create, update, remove };
