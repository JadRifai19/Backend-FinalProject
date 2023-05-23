import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import InstructorModel from '../models/instructormodels.js';

const TrainingSchema = new Schema({
  sessionCategory: { type: String, required: true },
  sessionDate: { type: Date, required: true },
  sessionTime: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }
});

TrainingSchema.pre(["find", "findOne", "create", "save"], function (next) {
  this.populate({ path: "instructor", model:InstructorModel  });
  next();
});
const Training = mongoose.model('Training', TrainingSchema);
export default Training;
