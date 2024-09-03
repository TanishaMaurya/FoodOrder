const Fooditem = require("../models/foodItem");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
exports.getAllFoodItems = catchAsync(async (_0xc693bd, _0x57d00f, _0x572dc4) => {
  let _0x398d05 = {};
  if (_0xc693bd.params.storeId) {
    _0x398d05 = {
      restaurant: _0xc693bd.params.storeId
    };
  }
  const _0xfcfa2e = await Fooditem.find(_0x398d05);
  _0x57d00f.status(0xc8).json({
    status: "success",
    results: _0xfcfa2e.length,
    data: _0xfcfa2e
  });
});
exports.createFoodItem = catchAsync(async (_0x2923d8, _0x311f1a, _0xa39273) => {
  const _0x421e86 = await Fooditem.create(_0x2923d8.body);
  _0x311f1a.status(0xc9).json({
    status: "success",
    data: _0x421e86
  });
});
exports.getFoodItem = catchAsync(async (_0x597840, _0x2226e6, _0x122184) => {
  const _0x335295 = await Fooditem.findById(_0x597840.params.foodId);
  if (!_0x335295) {
    return _0x122184(new ErrorHandler("No foodItem found with that ID", 0x194));
  }
  _0x2226e6.status(0xc8).json({
    status: "success",
    data: _0x335295
  });
});
exports.updateFoodItem = catchAsync(async (_0x5dd445, _0x2782df, _0x2612d5) => {
  const _0x5651af = await Fooditem.findByIdAndUpdate(_0x5dd445.params.foodId, _0x5dd445.body, {
    new: true,
    runValidators: true
  });
  if (!_0x5651af) {
    return _0x2612d5(new ErrorHandler("No document found with that ID", 0x194));
  }
  _0x2782df.status(0xc8).json({
    status: "success",
    data: _0x5651af
  });
});
exports.deleteFoodItem = catchAsync(async (_0x44eebd, _0x161902, _0x37376e) => {
  const _0x4697ab = await Fooditem.findByIdAndDelete(_0x44eebd.params.foodId);
  if (!_0x4697ab) {
    return _0x37376e(new ErrorHandler("No document found with that ID", 0x194));
  }
  _0x161902.status(0xcc).json({
    status: "success"
  });
});