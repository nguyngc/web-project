require("dotenv").config();
const colors = require("colors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const services = require("./data/services.js");
const Service = require("./models/serviceModel.js");

connectDB();

const importData = async () => {
  try {

    // Services
    await Service.deleteMany();
    await Service.insertMany(services);

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