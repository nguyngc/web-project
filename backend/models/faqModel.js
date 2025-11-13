/* 
{
  FAQid
  Question
  Answer
  CreatedBy
}
*/
const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer:   { type: String, required: true },
    createdBy:{ type: String, default: "api" }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

module.exports = mongoose.model("FAQ", faqSchema);
