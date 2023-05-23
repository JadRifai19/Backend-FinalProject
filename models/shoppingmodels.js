import mongoose from 'mongoose';
import userModel from "./usermodels.js";
import productModel from "./productmodels.js";

const { Schema, model } = mongoose;

const ShoppingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  });
  
  ShoppingSchema.pre(["find", "findOne", "create", "save"], function (next) {
    this.populate({ path: "user", model: userModel });
    this.populate({ path: "product", model: productModel });
    next();
  });

const Shopping = model('Shopping', ShoppingSchema);
export default Shopping;
