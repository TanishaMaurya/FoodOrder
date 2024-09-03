const Coupon = require("../models/couponModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
exports.createCoupon = catchAsync(async (_0x386d29, _0x5670e0, _0x5bb3a6) => {
  const _0x7cede8 = await Coupon.create(_0x386d29.body);
  _0x5670e0.status(0xc8).json({
    status: "success",
    data: _0x7cede8
  });
});
exports.getCoupon = catchAsync(async (_0xd3f2d2, _0x12c903, _0xacb989) => {
  const _0x2b197d = await Coupon.find();
  _0x12c903.status(0xc8).json({
    status: "success",
    data: _0x2b197d
  });
});
exports.updateCoupon = catchAsync(async (_0x40c2b7, _0x5619b5, _0x20fd8f) => {
  const _0x34df13 = await Coupon.findByIdAndUpdate(_0x40c2b7.params.couponId, _0x40c2b7.body, {
    new: true,
    runValidators: true
  });
  if (!_0x34df13) {
    return _0x20fd8f(new ErrorHandler("No Coupon found with that ID", 0x194));
  }
  _0x5619b5.status(0xc8).json({
    status: "success",
    data: _0x34df13
  });
});
exports.deleteCoupon = catchAsync(async (_0x11f883, _0x1ac70e, _0x3ce94b) => {
  const _0x362b77 = await Coupon.findByIdAndDelete(_0x11f883.params.couponId);
  if (!_0x362b77) {
    return _0x3ce94b(new ErrorHandler("No coupon found with given Id", 0x194));
  }
  _0x1ac70e.status(0xcc).json({
    status: "success"
  });
});
exports.couponValidate = catchAsync(async (_0x16783e, _0x388d83, _0x1fd28c) => {
  const {
    couponCode: _0x188616,
    cartItemsTotalAmount: _0x568fa9
  } = _0x16783e.body;
  const _0x863d42 = await Coupon.aggregate([{
    $addFields: {
      finalTotal: {
        $cond: [{
          $gte: [_0x568fa9, "$minAmount"]
        }, {
          $subtract: [_0x568fa9, {
            $min: [{
              $multiply: [_0x568fa9, {
                $divide: ["$discount", 0x64]
              }]
            }, "$maxDiscount"]
          }]
        }, _0x568fa9]
      },
      message: {
        $cond: [{
          $gte: [_0x568fa9, "$minAmount"]
        }, "", {
          $concat: ["add ₹ ", {
            $toString: {
              $subtract: ["$minAmount", _0x568fa9]
            }
          }, " more to avail this offer"]
        }]
      }
    }
  }, {
    $project: {
      _id: 0x0,
      subTitle: 0x1,
      couponName: 0x1,
      details: 0x1,
      minAmount: 0x1,
      finalTotal: 0x1,
      message: 0x1
    }
  }]);
  if (!_0x863d42) {
    return _0x1fd28c(new ErrorHandler("Invalid coupon code.", 0x194));
  }
  _0x388d83.status(0xc8).json({
    status: "success",
    data: _0x863d42
  });
});