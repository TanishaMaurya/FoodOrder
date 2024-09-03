const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(fileUpload());
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
app.use("/proxy", (_0x182cbe, _0x60ff3c) => {
  var _0x5d58f0 = "https://checkout.stripe.com" + _0x182cbe.url;
  _0x182cbe.pipe(request(_0x5d58f0)).pipe(_0x60ff3c);
});
const foodRouter = require("./routes/foodItem");
const restaurant = require("./routes/restaurant");
const menuRouter = require("./routes/menu");
const coupon = require("./routes/couponRoutes");
const order = require("./routes/order");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const cart = require("./routes/cart");
app.use(express.json({
  limit: "30kb"
}));
app.use(express.urlencoded({
  extended: true,
  limit: "30kb"
}));
app.use("/api/v1/eats", foodRouter);
app.use("/api/v1/eats/menus", menuRouter);
app.use("/api/v1/eats/stores", restaurant);
app.use("/api/v1/eats/orders", order);
app.use("/api/v1/users", auth);
app.use("/api/v1", payment);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/eats/cart", cart);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.all("*", (_0x2950f1, _0x498051, _0xdd2894) => {
  _0x498051.status(0x194).json({
    status: "fail",
    message: "Can't find " + _0x2950f1.originalUrl + " on this server !"
  });
});
app.use(errorMiddleware);
module.exports = app;