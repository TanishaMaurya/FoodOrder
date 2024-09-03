const Order = require("../models/order");
const Cart = require("../models/cartModel");
const {
  ObjectId
} = require("mongodb");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config/config.env"
});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.newOrder = catchAsyncErrors(async (_0x10ceb0, _0x35074e, _0x56740e) => {
  const {
    session_id: _0x111fb9
  } = _0x10ceb0.body;
  const _0xe213e6 = await stripe.checkout.sessions.retrieve(_0x111fb9, {
    expand: ["customer"]
  });
  console.log(_0xe213e6);
  const _0x1c6621 = await Cart.findOne({
    user: _0x10ceb0.user._id
  }).populate({
    path: "items.foodItem",
    select: "name price images"
  }).populate({
    path: "restaurant",
    select: "name"
  });
  console.log(_0x1c6621);
  let _0x2fed2e = {
    address: _0xe213e6.shipping_details.address.line1 + " " + _0xe213e6.shipping_details.address.line1,
    city: _0xe213e6.shipping_details.address.city,
    phoneNo: _0xe213e6.customer_details.phone,
    postalCode: _0xe213e6.shipping_details.address.postal_code,
    country: _0xe213e6.shipping_details.address.country
  };
  let _0x13c196 = _0x1c6621.items.map(_0x34d727 => ({
    name: _0x34d727.foodItem.name,
    quantity: _0x34d727.quantity,
    image: _0x34d727.foodItem.images[0x0].url,
    price: _0x34d727.foodItem.price,
    fooditem: _0x34d727.foodItem._id
  }));
  let _0x2a4067 = {
    id: _0xe213e6.payment_intent,
    status: _0xe213e6.payment_status
  };
  const _0x1c45c9 = await Order.create({
    orderItems: _0x13c196,
    deliveryInfo: _0x2fed2e,
    paymentInfo: _0x2a4067,
    deliveryCharge: +_0xe213e6.shipping_cost.amount_subtotal / 0x64,
    itemsPrice: +_0xe213e6.amount_subtotal / 0x64,
    finalTotal: +_0xe213e6.amount_total / 0x64,
    user: _0x10ceb0.user.id,
    restaurant: _0x1c6621.restaurant._id,
    paidAt: Date.now()
  });
  console.log(_0x1c45c9);
  await Cart.findOneAndDelete({
    user: _0x10ceb0.user._id
  });
  _0x35074e.status(0xc8).json({
    success: true,
    order: _0x1c45c9
  });
});
exports.getSingleOrder = catchAsyncErrors(async (_0x5c0d1e, _0x56fc05, _0x1c53e5) => {
  const _0x588e2c = await Order.findById(_0x5c0d1e.params.id).populate("user", "name email").populate("restaurant").exec();
  if (!_0x588e2c) {
    return _0x1c53e5(new ErrorHandler("No Order found with this ID", 0x194));
  }
  _0x56fc05.status(0xc8).json({
    success: true,
    order: _0x588e2c
  });
});
exports.myOrders = catchAsyncErrors(async (_0x2de21f, _0x27ede1, _0x5f2d95) => {
  const _0x43fd41 = new ObjectId(_0x2de21f.user.id);
  const _0x527187 = await Order.find({
    user: _0x43fd41
  }).populate("user", "name email").populate("restaurant").exec();
  _0x27ede1.status(0xc8).json({
    success: true,
    orders: _0x527187
  });
});
exports.allOrders = catchAsyncErrors(async (_0x479dbe, _0x235608, _0x3e9eb0) => {
  const _0x501fb6 = await Order.find();
  let _0x56bd4b = 0x0;
  _0x501fb6.forEach(_0x5acd8c => {
    _0x56bd4b += _0x5acd8c.finalTotal;
  });
  _0x235608.status(0xc8).json({
    success: true,
    totalAmount: _0x56bd4b,
    orders: _0x501fb6
  });
});