const ErrorHandler = require("../utils/errorHandler");
module.exports = (_0xc6fa59, _0x58123a, _0x352363, _0x3584bd) => {
  _0xc6fa59.statusCode = _0xc6fa59.statusCode || 0x1f4;
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    _0x352363.status(_0xc6fa59.statusCode).json({
      success: false,
      error: _0xc6fa59,
      errMessage: _0xc6fa59.message,
      stack: _0xc6fa59.stack
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let _0x5d984e = {
      ..._0xc6fa59
    };
    _0x5d984e.message = _0xc6fa59.message;
    if (_0xc6fa59.name == "castError") {
      const _0x388918 = "Resource not found. Invalid: " + _0xc6fa59.path;
      _0x5d984e = new ErrorHandler(_0x388918, 0x190);
    }
    if (_0xc6fa59.name === "ValidationError") {
      const _0x2fdf1d = Object.values(_0xc6fa59.errors).map(_0x2398a3 => _0x2398a3.message);
      _0x5d984e = new ErrorHandler(_0x2fdf1d, 0x190);
    }
    if (_0xc6fa59.code === 0x2af8) {
      const _0x3af329 = "Duplicate " + Object.keys(_0xc6fa59.keyValue) + " entered";
      _0x5d984e = new ErrorHandler(_0x3af329, 0x190);
    }
    if (_0xc6fa59.name === "JsonWebTokenError") {
      _0x5d984e = new ErrorHandler("JSON Web Token is invalid. Try Again!!!", 0x190);
    }
    if (_0xc6fa59.name === "TokenExpiredError") {
      _0x5d984e = new ErrorHandler("JSON Web Token is expired. Try Again!!!", 0x190);
    }
    _0x352363.status(_0x5d984e.statusCode).json({
      success: false,
      message: _0x5d984e.message || "Internal Server Error"
    });
  }
};