require("dotenv").config();
const connectDB = require("./config/db");

const services = require("./data/services.js");
const Service = require("./models/serviceModel.js");

const banners = require("./data/banners.js");
const Banner = require("./models/bannerModel.js");

const articles = require("./data/articles.js");
const Article = require("./models/articleModel.js");

const run = async () => {
  try {
    // 1. Connect DB
    await connectDB();

    if (process.argv[2] === "-d") {
      console.log("Destroying data...");
      await Service.deleteMany();
      await Banner.deleteMany();
      await Article.deleteMany();
      console.log("Data Destroyed!");
      process.exit(0);
    }

    console.log("Seeding data...");

    console.log("Number of services in data:", services.length);
    console.log("Number of articles in data:", articles.length);
    // 2. Delete old data
    await Service.deleteMany();
    await Banner.deleteMany();
    await Article.deleteMany();

    // 3. Insert new data
    await Service.insertMany(services);
    await Banner.insertMany(banners);
    await Article.insertMany(articles);

    const serviceCount = await Service.countDocuments();
    const bannerCount = await Banner.countDocuments();
    const articleCount = await Article.countDocuments();

    console.log("Services in DB after insert:", serviceCount);
    console.log("Banners in DB after insert:", bannerCount);
    console.log("Articles in DB after insert:", articleCount);
    console.log("Data Imported!");
    process.exit(0);
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
};

run();
