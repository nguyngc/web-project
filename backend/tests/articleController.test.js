// backend/tests/articleController.test.js
const mongoose = require("mongoose");

// Mock the Article model used by the controller
jest.mock("../models/articleModel");
const Article = require("../models/articleModel");

const ctrl = require("../controllers/articleController");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const makeThenableChain = (value, withSort = false) => {
  const chain = {
    sort() {
      return Promise.resolve(value);
    },
    then(onFulfilled, onRejected) {
      return Promise.resolve(value).then(onFulfilled, onRejected);
    },
  };

  if (!withSort) {
    // for findById-like behavior where we can just await a promise
    return Promise.resolve(value);
  }

  return {
    sort: chain.sort.bind(chain),
  };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Article Controller", () => {
  describe("getAll", () => {
    it("returns articles with filters (isPublished and q)", async () => {
      const req = {
        query: { q: "eye", category: "Eye Health", isPublished: "true" },
      };
      const res = mockRes();

      const fakeResult = [{ _id: "a1", title: "Eye care" }];
      // Article.find(filter).sort({ createdDateTime: -1 })
      Article.find.mockReturnValue({
        sort: () => Promise.resolve(fakeResult),
      });

      await ctrl.getAll(req, res);

      expect(Article.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
  });

  describe("getById", () => {
    it("returns 400 for invalid article id", async () => {
      const req = { params: { articleId: "bad-id" } };
      const res = mockRes();

      await ctrl.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid Article ID" });
    });

    it("returns 404 when article not found", async () => {
      const validId = new mongoose.Types.ObjectId().toString();
      const req = { params: { articleId: validId } };
      const res = mockRes();

      Article.findById.mockResolvedValue(null);

      await ctrl.getById(req, res);

      expect(Article.findById).toHaveBeenCalledWith(validId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Article not found" });
    });

    it("returns article when found", async () => {
      const articleId = new mongoose.Types.ObjectId().toString();
      const req = { params: { articleId } };
      const res = mockRes();

      const article = { _id: articleId, title: "Eye tips" };
      Article.findById.mockResolvedValue(article);

      await ctrl.getById(req, res);

      expect(res.json).toHaveBeenCalledWith(article);
    });
  });

  describe("create", () => {
    it("returns 400 when title or content missing", async () => {
      const req = { body: { title: "", content: "" }, user: { id: "u1" } };
      const res = mockRes();

      await ctrl.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "title and content are required",
      });
    });

    it("creates article successfully", async () => {
      const validUserId = new mongoose.Types.ObjectId().toString();
      const req = {
        body: { title: "New", content: "Content", category: "Eye Health" },
        user: { id: validUserId },
      };
      const res = mockRes();

      const created = { _id: "created1", ...req.body, createdBy: validUserId };
      Article.create.mockResolvedValue(created);

      await ctrl.create(req, res);

      expect(Article.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });
  });

  describe("update", () => {
    it("returns 400 for invalid article id", async () => {
      const req = { params: { articleId: "bad-id" }, body: {}, user: { id: "u1" } };
      const res = mockRes();

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid Article ID" });
    });

    it("returns 404 when updating nonexistent article", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { articleId: id }, body: { title: "x" }, user: { id: "u1" } };
      const res = mockRes();

      Article.findByIdAndUpdate.mockResolvedValue(null);

      await ctrl.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Article not found" });
    });

    it("updates article successfully", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { articleId: id }, body: { title: "Updated" }, user: { id: "u1" } };
      const res = mockRes();

      const updated = { _id: id, title: "Updated", modifiedBy: "u1" };
      Article.findByIdAndUpdate.mockResolvedValue(updated);

      await ctrl.update(req, res);

      expect(Article.findByIdAndUpdate).toHaveBeenCalledWith(id, expect.any(Object), { new: true });
      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe("remove", () => {
    it("returns 400 for invalid article id", async () => {
      const req = { params: { articleId: "bad-id" }, user: { id: "u1" } };
      const res = mockRes();

      await ctrl.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid Article ID" });
    });

    it("returns 404 when deleting nonexistent article", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { articleId: id }, user: { id: "u1" } };
      const res = mockRes();

      Article.findByIdAndDelete.mockResolvedValue(null);

      await ctrl.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Article not found" });
    });

    it("deletes article successfully", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = { params: { articleId: id }, user: { id: "u1" } };
      const res = mockRes();

      Article.findByIdAndDelete.mockResolvedValue({ _id: id });

      await ctrl.remove(req, res);

      expect(Article.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(res.json).toHaveBeenCalledWith({ message: "Deleted" });
    });
  });
});