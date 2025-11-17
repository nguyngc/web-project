const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    fullDescription: { type: String, default: "" },
    image: { type: String, default: "" },
    duration: { type: String, default: "" },
    price: { type: Number, default: 0 },
    frequency: { type: String, default: "" },
    features: { type: String, default: "" },
    benefits: { type: String, default: "" },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: { createdAt: "createdDateTime", updatedAt: "modifiedDateTime" }
  }
);

module.exports = mongoose.model("Service", serviceSchema);
