const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, default: null },
    gender: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    password: { type: String, required: true }, 
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      default: "user",
    },
    status: { type: String, default: "active" },
    createdBy: { type: String, default: "api" },
    modifiedBy: { type: String, default: null }
  },
  {
    timestamps: { createdAt: "createdDateTime", updatedAt: "modifiedDateTime" }
  }
);

module.exports = mongoose.model("User", userSchema);
