const Restaurant = require("../models/restaurant");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
exports.getAllRestaurants = catchAsync(async (_0x2e2880, _0x1ef84b, _0x5d8f62) => {
  const _0x2d0c90 = new APIFeatures(Restaurant.find(), _0x2e2880.query).search().sort();
  const _0x284da4 = await _0x2d0c90.query;
  _0x1ef84b.status(0xc8).json({
    status: "success",
    count: _0x284da4.length,
    restaurants: _0x284da4
  });
});          
exports.createRestaurant = catchAsync(async (_0x45f037, _0x58d6d6, _0x58b7ae) => {
  const _0x1aeee6 = await Restaurant.create(_0x45f037.body);
  _0x58d6d6.status(0xc9).json({
    status: "success",
    data: _0x1aeee6
  });
});
exports.getRestaurant = catchAsync(async (_0x2569be, _0x144d5b, _0x49feab) => {
  const _0x173721 = await Restaurant.findById(_0x2569be.params.storeId);
  if (!_0x173721) {
    return _0x49feab(new ErrorHandler("No Restaurant found with that ID", 0x194));
  }
  _0x144d5b.status(0xc8).json({
    status: "success",
    data: _0x173721
  });
});
exports.deleteRestaurant = catchAsync(async (_0x2939d5, _0x5c363a, _0x1d7eac) => {
  const _0x17e30a = await Restaurant.findByIdAndDelete(_0x2939d5.params.storeId);
  if (!_0x17e30a) {
    return _0x1d7eac(new ErrorHandler("No document found with that ID", 0x194));
  }
  _0x5c363a.status(0xcc).json({
    status: "success"
  });
});