const User = require("../models/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  promisify
} = require("util");
const dotenv = require("dotenv");
const ErrorHandler = require("../utils/errorHandler");
const Email = require("../utils/email");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
dotenv.config({
  path: "../config/config.env"
});
const createSendToken = (_0x5adec4, _0x83272d, _0x304067) => {
  const _0x30a201 = jwt.sign({
    id: _0x5adec4._id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME + "d"
  });
  const _0x47d86b = {
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_TIME * 0x18 * 0x3c * 0x3c * 0x3e8),
    httpOnly: true
  };
  _0x304067.cookie("jwt", _0x30a201, _0x47d86b);
  _0x5adec4.password = undefined;
  _0x304067.status(_0x83272d).json({
    success: true,
    token: _0x30a201,
    data: {
      user: _0x5adec4
    }
  });
};
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
exports.signup = catchAsyncErrors(async (_0x36ed18, _0x5de136, _0x133edf) => {
  const {
    name: _0x1f9cdf,
    email: _0x3255fa,
    password: _0x3c7b82,
    passwordConfirm: _0x2def08,
    phoneNumber: _0x5abbc9
  } = _0x36ed18.body;
  let _0x2b3a66 = {};
  if (_0x36ed18.body.avatar === "/images/images.png") {
    _0x2b3a66 = {
      public_id: "default",
      url: _0x36ed18.body.avatar
    };
  } else {
    const _0x19fd98 = await cloudinary.uploader.upload(_0x36ed18.body.avatar, {
      folder: "avatars",
      width: 0x96,
      crop: "scale"
    });
    _0x2b3a66 = {
      public_id: _0x19fd98.public_id,
      url: _0x19fd98.secure_url
    };
  }
  const _0x1208d4 = await User.create({
    name: _0x1f9cdf,
    email: _0x3255fa,
    password: _0x3c7b82,
    passwordConfirm: _0x2def08,
    phoneNumber: _0x5abbc9,
    avatar: _0x2b3a66
  });
  createSendToken(_0x1208d4, 0xc8, _0x5de136);
});
exports.login = catchAsyncErrors(async (_0x37bbe6, _0x399123, _0x141f80) => {
  const {
    email: _0x4000b8,
    password: _0x1ebfb1
  } = _0x37bbe6.body;
  if (!_0x4000b8 || !_0x1ebfb1) {
    return _0x141f80(new ErrorHandler("Please enter email & password", 0x190));
  }
  const _0x3bf199 = await User.findOne({
    email: _0x4000b8
  }).select("+password");
  if (!_0x3bf199) {
    return _0x141f80(new ErrorHandler("Invalid Email or Password", 0x191));
  }
  const _0x576947 = await _0x3bf199.correctPassword(_0x1ebfb1, _0x3bf199.password);
  if (!_0x576947) {
    return _0x141f80(new ErrorHandler("Invalid Email or Password", 0x191));
  }
  createSendToken(_0x3bf199, 0xc8, _0x399123);
});
exports.protect = catchAsyncErrors(async (_0xb0fa2, _0x60f196, _0x2afd7d) => {
  let _0x5766d5;
  if (_0xb0fa2.headers.authorization && _0xb0fa2.headers.authorization.startsWith("Bearer")) {
    _0x5766d5 = _0xb0fa2.headers.authorization.split(" ")[0x1];
  } else if (_0xb0fa2.cookies.jwt) {
    _0x5766d5 = _0xb0fa2.cookies.jwt;
  }
  if (!_0x5766d5) {
    return _0x2afd7d(new ErrorHandler("You are not logged in! Please log in to get access.", 0x194));
  }
  const _0x4e1d92 = await promisify(jwt.verify)(_0x5766d5, process.env.JWT_SECRET);
  const _0x31c942 = await User.findById(_0x4e1d92.id);
  if (!_0x31c942) {
    return _0x2afd7d(new ErrorHandler("User recently changed password ! please log in again.", 0x194));
  }
  if (_0x31c942.changedPasswordAfter(_0x4e1d92.iat)) {
    return _0x2afd7d(new ErrorHandler("User recently changed password ! please log in again.", 0x194));
  }
  _0xb0fa2.user = _0x31c942;
  _0x2afd7d();
});
exports.getUserProfile = catchAsyncErrors(async (_0x2fb0f4, _0x4fb165, _0xd73848) => {
  const _0x26c44c = await User.findById(_0x2fb0f4.user.id);
  _0x4fb165.status(0xc8).json({
    success: true,
    user: _0x26c44c
  });
});
exports.updatePassword = async (_0x4a4b2a, _0x4e8507, _0x41f18d) => {
  try {
    console.log(_0x4a4b2a.body);
    const {
      oldPassword: _0x519ec3,
      newPassword: _0x277f3f,
      newPasswordConfirm: _0x287737
    } = _0x4a4b2a.body;
    const _0x3b8e21 = await User.findById(_0x4a4b2a.user.id).select("+password");
    const _0x345d2c = await _0x3b8e21.correctPassword(_0x519ec3, _0x3b8e21.password);
    if (!_0x345d2c) {
      return _0x41f18d(new ErrorHandler("Old password is incorrect", 0x190));
    }
    _0x3b8e21.password = _0x277f3f;
    _0x3b8e21.passwordConfirm = _0x287737;
    await _0x3b8e21.save();
    _0x4e8507.status(0xc8).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (_0x5efd8b) {
    console.error(_0x5efd8b);
    return _0x41f18d(new ErrorHandler("Internal Server Error", 0x1f4));
  }
};
exports.updateProfile = catchAsyncErrors(async (_0xd6d9db, _0x53c909, _0x553956) => {
  const _0x3f8dc5 = {
    name: _0xd6d9db.body.name,
    email: _0xd6d9db.body.email
  };
  if (_0xd6d9db.body.avatar !== "") {
    const _0x380fb7 = await cloudinary.uploader.upload(_0xd6d9db.body.avatar, {
      folder: "avatars",
      width: 0x96,
      crop: "scale"
    });
    _0x3f8dc5.avatar = {
      public_id: _0x380fb7.public_id,
      url: _0x380fb7.secure_url
    };
  }
  _0x53c909.status(0xc8).json({
    success: true
  });
});
exports.forgotPassword = catchAsyncErrors(async (_0x55b205, _0xbabc1f, _0xab8dd7) => {
  const _0x2470da = await User.findOne({
    email: _0x55b205.body.email
  });
  if (!_0x2470da) {
    return _0xab8dd7(new ErrorHandler("There is no user with email address .", 0x194));
  }
  const _0x500d41 = _0x2470da.createPasswordResetToken();
  await _0x2470da.save({
    validateBeforeSave: false
  });
  try {
    const _0x425114 = process.env.FRONTEND_URL + "/users/resetPassword/" + _0x500d41;
    await new Email(_0x2470da, _0x425114).sendPasswordReset();
    return _0xbabc1f.status(0xc8).json({
      status: "success",
      message: "Token sent to email!"
    });
  } catch (_0x5a6308) {
    _0x2470da.passwordResetToken = undefined;
    _0x2470da.passwordResetExpires = undefined;
    await _0x2470da.save({
      validateBeforeSave: false
    });
    return _0xab8dd7(new ErrorHandler("There was an error sending the email, try again later!", 0x1f4));
  }
});
exports.resetPassword = catchAsyncErrors(async (_0x17eda0, _0x386798, _0x326e7a) => {
  const _0x123b07 = crypto.createHash("sha256").update(_0x17eda0.params.token).digest("hex");
  const _0x2e8172 = await User.findOne({
    passwordResetToken: _0x123b07,
    passwordResetExpires: {
      $gt: Date.now()
    }
  });
  if (!_0x2e8172) {
    return _0x326e7a(new ErrorHandler("Token is invalid or has expired", 0x190));
  }
  _0x2e8172.password = _0x17eda0.body.password;
  _0x2e8172.passwordConfirm = _0x17eda0.body.passwordConfirm;
  _0x2e8172.passwordResetToken = undefined;
  _0x2e8172.passwordResetExpires = undefined;
  await _0x2e8172.save();
  createSendToken(_0x2e8172, 0xc8, _0x386798);
});
exports.logout = catchAsyncErrors(async (_0x4aaeee, _0x202ce2, _0x2831d8) => {
  _0x202ce2.cookie("jwt", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });
  _0x202ce2.status(0xc8).json({
    success: true,
    message: "Logged out"
  });
});