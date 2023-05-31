import mongoose from "mongoose";
const { Schema, model } = mongoose;
import UserTraining from './usertrainingmodels.js';
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  // firstName: { type: String, required: true },
  // lastName: { type: String, required: true },
});


UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    console.log(this.password);
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};


const User = model("User", UserSchema);
export default User;