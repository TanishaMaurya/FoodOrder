const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  deliveryInfo: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    phoneNo: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  orderItems: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    fooditem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "FoodItem"
    }
  }],
  paymentInfo: {
    id: {
      type: String
    },
    status: {
      type: String
    }
  },
  paidAt: {
    type: Date
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0x0
  },
  taxPrice: {
    type: Number,
    default: 0x0
  },
  deliveryCharge: {
    type: Number,
    default: 0x0
  },
  finalTotal: {
    type: Number,
    required: true,
    default: 0x0
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing"
  },
  deliveredAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
orderSchema.pre("save", async function (_0x57572c) {
  try {
    for (const _0x2ee9d5 of this.orderItems) {
      const _0x34f763 = await mongoose.model("FoodItem").findById(_0x2ee9d5.fooditem);
      if (!_0x34f763) {
        throw new Error("Food item not found.");
      }
      if (_0x34f763.stock < _0x2ee9d5.quantity) {
        throw new Error("Insufficient stock for '" + _0x2ee9d5.name + "' in this order.");
      }
      _0x34f763.stock -= _0x2ee9d5.quantity;
      await _0x34f763.save();
    }
    _0x57572c();
  } catch (_0x176d89) {
    _0x57572c(_0x176d89);
  }
});
module.exports = mongoose.model("Order", orderSchema);