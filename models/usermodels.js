import mongoose from "mongoose";
const { Schema, model } = mongoose;
import UserTraining from './usertrainingmodels.js';

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});


const User = model("User", UserSchema);
export default User;