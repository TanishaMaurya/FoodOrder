const Menu = require("../models/menu");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
exports.getAllMenus = catchAsync(async (_0x233717, _0x3a79a6, _0x3183a5) => {
  let _0x58b4fe;
  if (_0x233717.params.storeId) {
    _0x58b4fe = {
      restaurant: _0x233717.params.storeId
    };
  }
  const _0x3c3e2d = await Menu.find(_0x58b4fe).populate({
    path: "menu.items",
    model: "FoodItem"
  }).exec();
  _0x3a79a6.status(0xc8).json({
    status: "success",
    count: _0x3c3e2d.length,
    data: _0x3c3e2d
  });
});
exports.createMenu = catchAsync(async (_0x401161, _0x5abe6b, _0x41d8cf) => {
  const _0xf92c58 = await Menu.create(_0x401161.body);
  _0x5abe6b.status(0xc9).json({
    status: "success",
    data: _0xf92c58
  });
});
exports.deleteMenu = catchAsync(async (_0x1e157a, _0x52cba3, _0x3f8f9e) => {
  const _0x541c84 = await Menu.findByIdAndDelete(_0x1e157a.params.menuId);
  if (!_0x541c84) {
    return _0x3f8f9e(new ErrorHandler("No document found with that ID", 0x194));
  }
  _0x52cba3.status(0xcc).json({
    status: "success"
  });
});