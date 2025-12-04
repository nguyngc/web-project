const mongoose = require("mongoose");

const doctorTimeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    week: { type: Number, default: 1 },
    //  format "YYYY-MM-DD"
    date: { type: String, required: true },

    availableTime: {
      slot1: { type: Boolean, default: false }, // 9:00-10:00
      slot2: { type: Boolean, default: false }, // 10:00-11:00
      slot3: { type: Boolean, default: false }, // 11:00-12:00
      slot4: { type: Boolean, default: false }, // 2:00-3:00
      slot5: { type: Boolean, default: false }, // 3:00-4:00
      slot6: { type: Boolean, default: false }, // 4:00-5:00
    },

    // "active" | "inactive"
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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

// Ensure each doctor has only one schedule per day
doctorTimeSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DoctorTime", doctorTimeSchema);
