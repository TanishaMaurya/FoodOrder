const Fooditem = require("../models/foodItem");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
const fooditems = require("../data/foodItem.json");
dotenv.config({
  path: "backend/config/config.env"
});
connectDatabase();
const seedFooditems = async () => {
  try {
    await Fooditem.deleteMany();
    console.log("FoodItems are deleted");
    await Fooditem.insertMany(fooditems);
    console.log("All FoodItems are added.");
    process.exit();
  } catch (_0x422dc1) {
    console.log(_0x422dc1.message);
    process.exit();
  }
};
seedFooditems();