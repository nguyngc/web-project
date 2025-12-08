const Banner = require("../models/bannerModel");
const ctrl = require("../controllers/bannerController");

jest.mock("../models/bannerModel");

describe("Banner Controller", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // Helper to mock find().sort() chain
  const mockFind = (returnValue) => ({
    sort: jest.fn().mockResolvedValue(returnValue),
  });

  // Helper to mock findOne().sort() chain
  const mockFindOne = (returnValue) => ({
    sort: jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue(returnValue),
    }),
  });

  describe("getAll", () => {
    it("returns all banners without query", async () => {
      const banners = [{ _id: "b1", title: "Banner 1" }];
      Banner.find.mockReturnValue(mockFind(banners));

      await ctrl.getAll({ query: {} }, res);

      expect(Banner.find).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith(banners);
    });

    it("filters banners by active and query", async () => {
      const banners = [{ _id: "b2", title: "Banner 2", isActive: true }];
      Banner.find.mockReturnValue(mockFind(banners));

      const req = { query: { active: "true", q: "2" } };
      await ctrl.getAll(req, res);

      expect(Banner.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(banners);
    });
  });

  describe("create", () => {
    it("creates banner successfully", async () => {
      const req = {
        body: { title: "New Banner", image: "img.png" },
        user: { id: "user1" },
      };

      const lastBanner = { order: 5 };
      Banner.findOne.mockReturnValue(mockFindOne(lastBanner));

      const createdBanner = { _id: "b3", ...req.body, order: 6, isActive: true };
      Banner.create.mockResolvedValue(createdBanner);

      await ctrl.create(req, res);

      expect(Banner.findOne).toHaveBeenCalled();
      expect(Banner.create).toHaveBeenCalledWith(
        expect.objectContaining({ order: 6, title: "New Banner", image: "img.png" })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdBanner);
    });
  });

  describe("reorder", () => {
    it("reorders banners successfully", async () => {
      const sortedList = [
        { _id: "b2", order: 1 },
        { _id: "b1", order: 2 },
      ];

      const req = {
        body: [
          { id: "b2", order: 1 },
          { id: "b1", order: 2 },
        ],
      };

      Banner.findByIdAndUpdate.mockResolvedValue({});
      Banner.find.mockReturnValue(mockFind(sortedList));

      await ctrl.reorder(req, res);

      expect(Banner.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(sortedList);
    });
  });
});
