const express = require("express");
const router = express.Router();
const user = require("../models/user");
const Catalog = require("../models/catalog");
const isauth = require("../isauth");
const Order = require("../models/order");

router.get("/orders", async (req, res) => {
  const orders = await Order.find({ sellerid: req.user.id });
  return res.json({ orders });
});

router.post("/create-catalog", async (req, res) => {
  const user = req.user;
  const { items } = req.body;
  // console.log(items);
  var products = [];

  const catalog = new Catalog({ sellerid: user.id });

  items.forEach((item) => {
    const prod = new Product({ name: item.name, price: item.price });

    catalog.products.push(prod);
  });
  catalog.save();

  return res.json({ msg: "catalog created", id: catalog.id });
});

module.exports = router;
