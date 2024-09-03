class ErrorHandler extends Error {
  constructor(_0x34f3d9, _0x471048) {
    super(_0x34f3d9);
    this.statusCode = _0x471048;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandler;