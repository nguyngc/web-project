const mongoose = require("mongoose");

const doctorInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one doctor has only one DoctorInfo
    },
    specialization: { type: String, default: "" },
    licenseNumber: { type: String, default: "" },
    yoe: { type: Number, default: 0 }, // Years of Experience
    education: { type: String, default: "" },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },

    // Who created & last modified this record
    createdBy: { type: String, default: "api" },
    modifiedBy: { type: String, default: null },
  },
  {
    timestamps: { createdAt: "createdDateTime", updatedAt: "modifiedDateTime" },
  }
);

module.exports = mongoose.model("DoctorInfo", doctorInfoSchema);
