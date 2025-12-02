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

    // Hashed password (bcrypt)
    password: { type: String, required: true },

    // "user" | "doctor" | "admin"
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      default: "user",
    },

    // "active" | "inactive"
    status: {
      type: Boolean, default: true
    },

    // Embedded doctor info (only used if role === "doctor")
    doctorInfo: {
      specialization: { type: String, default: "" },
      licenseNumber: { type: String, default: "" },
      yoe: { type: Number, default: 0 },   // years of experience
      education: { type: String, default: "" },
      bio: { type: String, default: "" },
      profilePicture: { type: String, default: "" },
    },

    createdBy: { type: String, default: "api" },
    modifiedBy: { type: String, default: null },
  },
  {
    timestamps: {
      createdAt: "createdDateTime",
      updatedAt: "modifiedDateTime",
    },
  }
);



module.exports = mongoose.model("User", userSchema);
