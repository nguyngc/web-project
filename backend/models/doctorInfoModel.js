const mongoose = require("mongoose");

const doctorInfoSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    specialization: { type: String, default: "" },
    licenseNumber: { type: String, default: "" },
    yoe: { type: Number, default: 0 }, // Years of Experience
    education: { type: String, default: "" },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" }
  },
  {
    timestamps: { createdAt: "createdDateTime", updatedAt: "modifiedDateTime" }
  }
);

module.exports = mongoose.model("DoctorInfo", doctorInfoSchema);
