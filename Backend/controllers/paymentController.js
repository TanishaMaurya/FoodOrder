const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config/config.env"
});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log("KEY", process.env.STRIPE_SECRET_KEY);
exports.processPayment = catchAsyncErrors(async (_0x57f9d5, _0x55d4c9, _0x47b75c) => {
  console.log(_0x57f9d5.body);
  const _0x17f08d = await stripe.checkout.sessions.create({
    customer_email: _0x57f9d5.user.email,
    phone_number_collection: {
      enabled: true
    },
    line_items: _0x57f9d5.body.items.map(_0x2b8477 => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: _0x2b8477.foodItem.name,
          images: [_0x2b8477.foodItem.images[0x0].url]
        },
        unit_amount: _0x2b8477.foodItem.price * 0x64
      },
      quantity: _0x2b8477.quantity
    })),
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "IN"]
    },
    shipping_options: [{
      shipping_rate_data: {
        display_name: "Delivery Charges",
        type: "fixed_amount",
        fixed_amount: {
          amount: 0x157c,
          currency: "inr"
        },
        delivery_estimate: {
          minimum: {
            unit: "hour",
            value: 0x1
          },
          maximum: {
            unit: "hour",
            value: 0x3
          }
        }
      }
    }],
    success_url: process.env.FRONTEND_URL + "/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: process.env.FRONTEND_URL + "/cart"
  });
  _0x55d4c9.status(0xc8).json({
    url: _0x17f08d.url
  });
});
exports.sendStripApi = catchAsyncErrors(async (_0x97ee0e, _0x19506e, _0x5d24e0) => {
  _0x19506e.status(0xc8).json({
    stripeApiKey: process.env.STRIPE_API_KEY
  });
});