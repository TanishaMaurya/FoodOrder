const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [0x1e, "Your name cannot exceed 30 characters"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter valid email address"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [0x6, "Your password must be longer than 6 characters"],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please consfirm your password"],
    validate: function (_0x54d8e7) {
      return _0x54d8e7 === this.password;
    },
    message: "password are not same !"
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    enum: ["user", "restaurant-owner", "admin"],
    default: "user"
  },
  phoneNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date
});
userSchema.pre("save", async function (_0x34a41a) {
  if (!this.isModified("password")) {
    return _0x34a41a();
  }
  this.password = await bcrypt.hash(this.password, 0xc);
  this.passwordConfirm = undefined;
  _0x34a41a();
});
userSchema.methods.correctPassword = async function (_0x5093a7, _0x3f4bca) {
  return await bcrypt.compare(_0x5093a7, _0x3f4bca);
};
userSchema.methods.changedPasswordAfter = function (_0x51888b) {
  if (this.passwordChangedAt) {
    const _0xb65d74 = parseInt(this.passwordChangedAt.getTime() / 0x3e8, 0xa);
    return _0x51888b < _0xb65d74;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const _0x233cfb = crypto.randomBytes(0x20).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(_0x233cfb).digest("hex");
  this.passwordResetExpires = Date.now() + 600000;
  return _0x233cfb;
};
module.exports = mongoose.model("User", userSchema);