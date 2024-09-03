const Cart = require("../models/cartModel");
const FoodItem = require("../models/foodItem");
const Restaurant = require("../models/restaurant");
async function addItemToCart(_0x18189f, _0x40ca66) {
  const {
    userId: _0xaac0de,
    foodItemId: _0x1f91f9,
    restaurantId: _0x5275af,
    quantity: _0x23eefc
  } = _0x18189f.body;
  try {
    const _0x3a759d = await FoodItem.findById(_0x1f91f9);
    if (!_0x3a759d) {
      return _0x40ca66.status(0x194).json({
        message: "Food item not found"
      });
    }
    const _0x2d0c02 = await Restaurant.findById(_0x5275af);
    if (!_0x2d0c02) {
      return _0x40ca66.status(0x194).json({
        message: "Restaurant not found"
      });
    }
    let _0x36baeb = await Cart.findOne({
      user: _0xaac0de
    });
    if (_0x36baeb) {
      if (_0x36baeb.restaurant.toString() !== _0x5275af) {
        await Cart.deleteOne({
          _id: _0x36baeb._id
        });
        _0x36baeb = new Cart({
          user: _0xaac0de,
          restaurant: _0x5275af,
          items: [{
            foodItem: _0x1f91f9,
            quantity: _0x23eefc
          }]
        });
      } else {
        const _0x6e3c2c = _0x36baeb.items.findIndex(_0x51510c => _0x51510c.foodItem.toString() === _0x1f91f9);
        if (_0x6e3c2c > -0x1) {
          _0x36baeb.items[_0x6e3c2c].quantity += _0x23eefc;
        } else {
          _0x36baeb.items.push({
            foodItem: _0x1f91f9,
            quantity: _0x23eefc
          });
        }
      }
    } else {
      _0x36baeb = new Cart({
        user: _0xaac0de,
        restaurant: _0x5275af,
        items: [{
          foodItem: _0x1f91f9,
          quantity: _0x23eefc
        }]
      });
    }
    await _0x36baeb.save();
    const _0x4e26d1 = await Cart.findOne({
      user: _0xaac0de
    }).populate({
      path: "items.foodItem",
      select: "name price images"
    }).populate({
      path: "restaurant",
      select: "name"
    });
    _0x40ca66.status(0xc8).json({
      message: "Cart updated",
      cart: _0x4e26d1
    });
  } catch (_0x15fedd) {
    _0x40ca66.status(0x1f4).json({
      message: "Server error",
      error: _0x15fedd
    });
  }
}
async function updateCartItemQuantity(_0x445840, _0xfc9540) {
  const {
    userId: _0xc78bc5,
    foodItemId: _0x37199a,
    quantity: _0x4c3e05
  } = _0x445840.body;
  try {
    let _0x340c19 = await Cart.findOne({
      user: _0xc78bc5
    });
    if (!_0x340c19) {
      return _0xfc9540.status(0x194).json({
        message: "Cart not found"
      });
    }
    const _0x10c1b2 = _0x340c19.items.findIndex(_0x24be80 => _0x24be80.foodItem.toString() === _0x37199a);
    if (_0x10c1b2 === -0x1) {
      return _0xfc9540.status(0x194).json({
        message: "Food item not found in cart"
      });
    }
    _0x340c19.items[_0x10c1b2].quantity = _0x4c3e05;
    await _0x340c19.save();
    const _0x5a4f21 = await Cart.findOne({
      user: _0xc78bc5
    }).populate({
      path: "items.foodItem",
      select: "name price images"
    }).populate({
      path: "restaurant",
      select: "name"
    });
    _0xfc9540.status(0xc8).json({
      message: "Cart item quantity updated",
      cart: _0x5a4f21
    });
  } catch (_0x155ba8) {
    _0xfc9540.status(0x1f4).json({
      message: "Server error",
      error: _0x155ba8
    });
  }
}
async function deleteCartItem(_0x4a1d12, _0x54f9c4) {
  const {
    userId: _0x4b64ba,
    foodItemId: _0x4c2e25
  } = _0x4a1d12.body;
  try {
    let _0x255aad = await Cart.findOne({
      user: _0x4b64ba
    });
    if (!_0x255aad) {
      return _0x54f9c4.status(0x194).json({
        message: "Cart not found"
      });
    }
    const _0x37abc3 = _0x255aad.items.findIndex(_0x1b4c45 => _0x1b4c45.foodItem.toString() === _0x4c2e25);
    if (_0x37abc3 === -0x1) {
      return _0x54f9c4.status(0x194).json({
        message: "Food item not found in cart"
      });
    }
    _0x255aad.items.splice(_0x37abc3, 0x1);
    if (_0x255aad.items.length === 0x0) {
      await Cart.deleteOne({
        _id: _0x255aad._id
      });
      return _0x54f9c4.status(0xc8).json({
        message: "Cart deleted"
      });
    } else {
      await _0x255aad.save();
      const _0x1503da = await Cart.findOne({
        user: _0x4b64ba
      }).populate({
        path: "items.foodItem",
        select: "name price images"
      }).populate({
        path: "restaurant",
        select: "name"
      });
      _0x54f9c4.status(0xc8).json({
        message: "Cart item deleted",
        cart: _0x1503da
      });
    }
  } catch (_0x17cab0) {
    _0x54f9c4.status(0x1f4).json({
      message: "Server error",
      error: _0x17cab0
    });
  }
}
async function getCartItem(_0x4457c7, _0x505f5a) {
  const _0x4e5e89 = _0x4457c7.user;
  try {
    const _0x20fa80 = await Cart.findOne({
      user: _0x4e5e89
    }).populate({
      path: "items.foodItem",
      select: "name price images"
    }).populate({
      path: "restaurant",
      select: "name"
    });
    return !_0x20fa80 ? _0x505f5a.status(0x194).json({
      message: "No cart found"
    }) : _0x505f5a.status(0xc8).json({
      status: "success",
      data: _0x20fa80
    });
  } catch (_0xf48f51) {
    _0x505f5a.status(0x1f4).json({
      message: "Server error",
      error: _0xf48f51
    });
  }
}
module.exports = {
  addItemToCart: addItemToCart,
  updateCartItemQuantity: updateCartItemQuantity,
  deleteCartItem: deleteCartItem,
  getCartItem: getCartItem
};