const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    category: { type: String, default: "" },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    authorBio: { type: String, default: "" },
    thumbnailImage: { type: String, default: "" },
    content: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    createdBy: { type: String, default: "api" },
    modifiedBy: { type: String, default: null }
  },
  {
    timestamps: { createdAt: "createdDateTime", updatedAt: "modifiedDateTime" }
  }
);

module.exports = mongoose.model("Article", articleSchema);
