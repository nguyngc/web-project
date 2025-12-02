const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    fullDescription: { type: String, default: "" },
    image: { type: String, default: "" },
    duration: { type: String, default: "" },
    price: { type: String, default: "" },
    frequency: { type: String, default: "" },
    features: { type: String, default: "" },
    benefits: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, default: "api" },
    modifiedBy: { type: String, default: null },
  },
  {
    timestamps: { createdAt: "createdDateTime", updatedAt: "modifiedDateTime" },
  }
);

module.exports = mongoose.model("Service", serviceSchema);
