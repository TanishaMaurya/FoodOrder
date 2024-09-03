class APIFeatures {
  constructor(_0x9b2154, _0x42992b) {
    this.query = _0x9b2154;
    this.queryStr = _0x42992b;
  }
  ["search"]() {
    const _0x4962e6 = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: "i"
      }
    } : {};
    this.query = this.query.find({
      ..._0x4962e6
    });
    return this;
  }
  ["filter"]() {
    const _0xf64c16 = {
      ...this.queryStr
    };
    console.log(_0xf64c16);
    const _0x3ed6dd = ["keyword", "limit", "page"];
    _0x3ed6dd.forEach(_0x1e81c2 => delete _0xf64c16[_0x1e81c2]);
    console.log(_0xf64c16);
    let _0x30085e = JSON.stringify(_0xf64c16);
    _0x30085e = _0x30085e.replace(/\b(gt|gte|lt|lte)\b/g, _0x597d9e => "$" + _0x597d9e);
    console.log(_0x30085e);
    this.query = this.query.find(JSON.parse(_0x30085e));
    if (this.queryStr.sortBy) {
      const _0xe976b2 = this.queryStr.sortBy.toLowerCase();
      if (_0xe976b2 === "ratings") {
        sortQuery = {
          ratings: -0x1
        };
      } else if (_0xe976b2 === "reviews") {
        sortQuery = {
          numOfReviews: -0x1
        };
      }
    }
    this.query = this.query.sort(sortQuery);
    return this;
  }
  ["pagination"](_0x20dcd9) {
    const _0x4d4173 = Number(this.queryStr.page) || 0x1;
    const _0x14cdd1 = _0x20dcd9 * (_0x4d4173 - 0x1);
    this.query = this.query.limit(_0x20dcd9).skip(_0x14cdd1);
    return this;
  }
  ["sort"]() {
    if (this.queryStr.sortBy) {
      const _0x396e88 = this.queryStr.sortBy.toLowerCase();
      let _0x436602 = {};
      if (_0x396e88 === "ratings") {
        _0x436602 = {
          ratings: -0x1
        };
      } else if (_0x396e88 === "reviews") {
        _0x436602 = {
          numOfReviews: -0x1
        };
      }
      this.query = this.query.sort(_0x436602);
    }
    return this;
  }
}
module.exports = APIFeatures;