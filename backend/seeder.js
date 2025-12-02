require("dotenv").config();
const colors = require("colors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const services = require("./data/services.js");
const Service = require("./models/serviceModel.js");

const banners = require("./data/banners.js");
const Banner = require("./models/bannerModel.js");

const articles = require("./data/articles.js");
const Article = require("./models/articleModel.js");

connectDB();

const importData = async () => {
  try {
    // Services
    await Service.deleteMany();
    await Service.insertMany(services);

    // Banners
    await Banner.deleteMany();
    await Banner.insertMany(banners);

    // Articles
    await Article.deleteMany();
    await Article.insertMany(articles);

    // FAQ



    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Service.deleteMany();
    await Banner.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}