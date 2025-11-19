// services/gemini.js
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// You can also use: "gemini-2.5-flash" if you want stronger answers
const MODEL_NAME = "gemini-2.5-flash-lite";

async function callGemini(userPrompt) {
  const instruction = `
You are a helpful assistant for an eye clinic web application.

Reply style rules:
- Answer in English.
- Be concise and easy to understand.
- Prefer short paragraphs or bullet points.
- Maximum about 4–6 sentences in total.
- Avoid long introductions and repetition.
- If the user asks for code, show only the essential code and a very short explanation.
- Recommend contacting a doctor directly for medical advice if related to medical issues.
`;

  // Combine instructions + user prompt into one string
  const fullPrompt = `${instruction}\n\nUser question:\n${userPrompt}`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: fullPrompt,
    config: {
      temperature: 0.3,      // slightly creative but still controlled
      maxOutputTokens: 200,   
    },
  });

  return response;
}

module.exports = callGemini;
