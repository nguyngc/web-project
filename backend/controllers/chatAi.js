const callGemini = require("../services/gemini");
const ChatMessage = require("../models/chatMessageModel");

const chatAi = async (req, res) => {
  const { prompt } = req.body || {};

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  if (prompt.length > 500) {
    return res.status(400).json({ message: "Prompt is too long" });
  }

  try {
    const aiText = await callGemini(prompt);

    const saved = await ChatMessage.create({
      user: req.user ? req.user._id : null, // có login thì lưu userId, không thì null
      userMessage: prompt,
      aiResponse: aiText,
    });

    res.json({
      output: aiText,
      id: saved._id,
    });
  } catch (error) {
    console.error("chatAi error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};

module.exports = chatAi;
