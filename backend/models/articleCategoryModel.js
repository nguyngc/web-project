const mongoose = require("mongoose");

const articleCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    createdBy: { type: String, default: "api" },
    modifiedBy: { type: String, default: null }
  },
  {
    timestamps: { createdAt: "createdDateTime", updatedAt: "modifiedDateTime" }
  }
);

module.exports = mongoose.model("ArticleCategory", articleCategorySchema);
