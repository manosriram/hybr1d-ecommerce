const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    usertype: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

module.exports = User = mongoose.model("user", UserSchema);
