const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose.connect(process.env.DB_LOCAL_URI, {}).then(_0x100f29 => {
    console.log("MongoDB Database connected with HOST:" + _0x100f29.connection.host);
  });
};
module.exports = connectDatabase;