const chatAi = require("../controllers/chatAi");
const callGemini = require("../services/gemini");
const ChatMessage = require("../models/chatMessageModel");

jest.mock("../services/gemini");
jest.mock("../models/chatMessageModel");

describe("chatAi Controller", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {}); // ẩn console.error
  });

  afterAll(() => {
    console.error.mockRestore(); // restore console.error
  });

  it("returns 400 if prompt is missing", async () => {
    const req = { body: {} };
    await chatAi(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Prompt is required" });
  });

  it("returns 400 if prompt is too long", async () => {
    const req = { body: { prompt: "a".repeat(501) } };
    await chatAi(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Prompt is too long" });
  });

  it("returns AI response and saves ChatMessage", async () => {
    const prompt = "Hello AI";
    const aiResponse = "AI says hi";
    const req = { body: { prompt }, user: { id: "user1" } };
    const savedMessage = { _id: "msg1" };

    callGemini.mockResolvedValue(aiResponse);
    ChatMessage.create.mockResolvedValue(savedMessage);

    await chatAi(req, res);

    expect(callGemini).toHaveBeenCalledWith(prompt);
    expect(ChatMessage.create).toHaveBeenCalledWith({
      user: "user1",
      userMessage: prompt,
      aiResponse,
    });
    expect(res.json).toHaveBeenCalledWith({ output: aiResponse, id: savedMessage._id });
  });

  it("returns 500 if callGemini fails", async () => {
    const prompt = "Hello AI";
    const req = { body: { prompt } };

    callGemini.mockRejectedValue(new Error("Service error"));

    await chatAi(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to get AI response" });
  });
});
