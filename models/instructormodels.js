import mongoose from "mongoose";
import sessionModel from "./trainingmodels.js";
const { Schema, model } = mongoose;

const InstructorSchema = new Schema({
  instructor_name: {
    type: String,
    required: true,
  },
});




const Instructor = mongoose.model("Instructor", InstructorSchema);
export default Instructor;
