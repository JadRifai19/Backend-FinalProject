import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const TrainingSchema = new Schema ({
    sessionType: { type: String, required: true },
    sessionCategory: { type: String, required: true },
    sessionDate: { type: Date, required: true },
    sessionTime: { type: String, required: true },
    availableSlots: { type: Number, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }
});

const Training = mongoose.model('Training', TrainingSchema);
export default Training;