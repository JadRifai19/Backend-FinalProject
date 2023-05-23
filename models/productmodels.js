import mongoose from "mongoose";
import userModel from "./usermodels.js";

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String },
  user_Id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
});

ProductSchema.pre(["find", "findOne", "create", "save"], function (next) {
  this.populate({ path: "user_Id", model: userModel });
  next();
});

const Product = model("Product", ProductSchema);

export default Product;
