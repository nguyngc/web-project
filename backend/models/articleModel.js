const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "ArticleCategory", required: true },
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
