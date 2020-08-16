const mongoose = require("mongoose");

const NSESchema = new mongoose.Schema({
  Date: String,
  Open: Number,
  High: Number,
  Low: Number,
  Close: Number,
  AdjClose: Number,
  Volume: Number,
});
module.exports = mongoose.model("NSE", NSESchema);
