// backend/tests/faqController.test.js
const mongoose = require("mongoose");
jest.mock("../models/faqModel");
const FAQ = require("../models/faqModel");

const ctrl = require("../controllers/faqController");

// Mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Helper for chainable thenable
const makeThenableChain = (value) => ({
  sort() { return Promise.resolve(value); },
  then(onFulfilled) { return Promise.resolve(value).then(onFulfilled); },
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("FAQ Controller", () => {

  describe("getAll", () => {
    it("returns all FAQs without query", async () => {
      const req = { query: {} };
      const res = mockRes();

      const faqs = [{ _id: "f1", question: "Q1", answer: "A1" }];
      FAQ.find.mockReturnValue(makeThenableChain(faqs));

      await ctrl.getAll(req, res);

      expect(FAQ.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(faqs);
    });

    it("filters FAQs by query", async () => {
      const req = { query: { q: "check" } };
      const res = mockRes();

      const faqs = [{ _id: "f2", question: "check question", answer: "A2" }];
      FAQ.find.mockReturnValue(makeThenableChain(faqs));

      await ctrl.getAll(req, res);

      expect(FAQ.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(faqs);
    });
  });

  describe("getById", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { faqId: "bad-id" } };
      const res = mockRes();

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid FAQ ID" });
    });

    it("returns 404 if not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { faqId: id } };
      const res = mockRes();

      FAQ.findById.mockReturnValue(makeThenableChain(null));

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "FAQ not found" });
    });

    it("returns FAQ when found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { faqId: id } };
      const res = mockRes();

      const faq = { _id: id, question: "Q", answer: "A" };
      FAQ.findById.mockReturnValue(makeThenableChain(faq));

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(faq);
    });
  });

  describe("create", () => {
    it("returns 400 if missing question/answer", async () => {
      const req = { body: { question: "", answer: "" }, user: { id: "admin1" } };
      const res = mockRes();

      await ctrl.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "question & answer are required" });
    });

    it("creates FAQ successfully", async () => {
      const req = { body: { question: "Q", answer: "A" }, user: { id: "admin1" } };
      const res = mockRes();

      const created = { _id: "f1", question: "Q", answer: "A", createdBy: "admin1" };
      FAQ.create.mockResolvedValue(created);

      await ctrl.create(req, res);

      expect(FAQ.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });
  });

  describe("update", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { faqId: "bad" }, body: {}, user: { id: "admin1" } };
      const res = mockRes();

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid FAQ ID" });
    });

    it("returns 404 if FAQ not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { faqId: id }, body: {}, user: { id: "admin1" } };
      const res = mockRes();

      FAQ.findByIdAndUpdate.mockResolvedValue(null);

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "FAQ not found" });
    });

    it("updates FAQ successfully", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { faqId: id }, body: { question: "New Q" }, user: { id: "admin1" } };
      const res = mockRes();

      const updated = { _id: id, question: "New Q", answer: "A", modifiedBy: "admin1" };
      FAQ.findByIdAndUpdate.mockResolvedValue(updated);

      await ctrl.update(req, res);

      expect(FAQ.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe("remove", () => {
    it("returns 400 for invalid ID", async () => {
      const req = { params: { faqId: "bad" } };
      const res = mockRes();

      await ctrl.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid FAQ ID" });
    });

    it("returns 404 if FAQ not found", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { faqId: id } };
      const res = mockRes();

      FAQ.findByIdAndDelete.mockResolvedValue(null);

      await ctrl.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "FAQ not found" });
    });

    it("deletes FAQ successfully", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { faqId: id } };
      const res = mockRes();

      FAQ.findByIdAndDelete.mockResolvedValue({ _id: id });

      await ctrl.remove(req, res);

      expect(FAQ.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Deleted" });
    });
  });

});
