const mongoose = require("mongoose");

const doctorTimeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    week: { type: String, default: "" },
    date: { type: String, required: true },
    availableTime: {
      slot1: { type: Boolean, default: false },    // 8:00-9:00
      slot2: { type: Boolean, default: false },       // 9:00-10:00
      slot3: { type: Boolean, default: false },  // 10:00-11:00
      slot4: { type: Boolean, default: false }     // 11:00-12:00
    },
    status: { type: String, default: "active" }
  },
  {
    timestamps: { createdAt: "createdDateTime", updatedAt: "modifiedDateTime" }
  }
);

// Index to make sure each doctor has only one schedule per day
doctorTimeSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DoctorTime", doctorTimeSchema);
