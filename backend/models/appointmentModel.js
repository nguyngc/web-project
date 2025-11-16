const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", default: null },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: "pending" },
    diagnosis: { type: String, default: "" },
    rightEye: { type: String, default: "" },
    leftEye: { type: String, default: "" },
    prescriptionNotes: { type: String, default: "" },
    userNotes: { type: String, default: "" },
    doctorNotes: { type: String, default: "" },
    nextAppointment: { type: String, default: null },
    createdBy: { type: String, default: "api" },
    modifiedBy: { type: String, default: null }
  },
  {
    timestamps: { createdAt: "createdDateTime", updatedAt: "modifiedDateTime" }
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
