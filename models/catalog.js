const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./product");

const CatalogSchema = new Schema(
  {
    sellerid: {
      type: String,
    },
    products: [{ name: String, price: String }],
    active: { type: Boolean, default: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.sellerid;
      },
    },
  }
);

// todo: limit 1 catalog to 1 seller
CatalogSchema.pre("save", async function (done) {
  const sellerCatalogs = await Catalog.updateMany(
    { sellerid: this.sellerid },
    { $set: { active: false } }
  );

  const s = await Catalog.find({ sellerid: this.sellerid });
  console.log(s);

  done();
});

module.exports = Catalog = mongoose.model("catalog", CatalogSchema);
