const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./product");

const OrderSchema = new Schema({
  sellerid: {
    type: String,
  },
  products: [{ type: String }],
});

module.exports = Order = mongoose.model("order", OrderSchema);
