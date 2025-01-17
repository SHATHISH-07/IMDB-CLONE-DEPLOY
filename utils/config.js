require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3002;

module.exports = {
  PORT,
  MONGODB_URI,
};
