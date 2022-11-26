const express = require("express");
const router = express.Router();
const user = require("../models/user");
const Catalog = require("../models/catalog");
const Order = require("../models/order");

router.post("/create-order/:seller_id", async (req, res) => {
  const { seller_id } = req.params;
  const { items } = req.body;

  let order = new Order({ sellerid: seller_id, products: items });
  order.save();
  return res.json({ order: order });
});

router.get("/seller-catalog/:seller_id", async (req, res) => {
  const { seller_id } = req.params;

  const catalog = await Catalog.findOne({ sellerid: seller_id, active: true });

  return res.json({ catalog: catalog });
});

router.get("/list-of-sellers", async (req, res) => {
  const sellers = await User.find({ usertype: "seller" });

  return res.json({ sellers: sellers });
});

module.exports = router;
