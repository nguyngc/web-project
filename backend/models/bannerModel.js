/*
{
  "image": "/img/hero2.jpg",
  "title": "Kids Eye Care",
  "subtitle": "Gentle & friendly",
  "buttonText": "Learn more",
  "buttonLink": "/services/kids",
  "order": 2,
  "isActive": false
}

*/

// models/bannerModel.js
const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    badge: { type: String, default: "" },
    image: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    buttonLink: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, default: "api" },
    modifiedBy: { type: String, default: null },
  },
  {
    // giống style của User
    timestamps: {
      createdAt: "createdDateTime",
      updatedAt: "modifiedDateTime",
    },
  }
);

module.exports = mongoose.model("Banner", bannerSchema);
