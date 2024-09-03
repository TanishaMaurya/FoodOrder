const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
process.on("uncaughtException", _0x292333 => {
  console.log("ERROR: " + _0x292333.stack);
  console.log("Shutting down server due to uncaught exception");
  process.exit(0x1);
});
dotenv.config({
  path: "./config/config.env"
});
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const server = app.listen(process.env.PORT, () => {
  console.log("Server started on PORT: " + process.env.PORT + " in " + process.env.NODE_ENV + " mode.");
});
process.on("unhandledRejection ", _0x560a3e => {
  console.log("ERROR: " + _0x560a3e.message);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(0x1);
  });
});