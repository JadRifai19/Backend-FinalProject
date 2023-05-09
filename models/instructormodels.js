import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const InstructorSchema = new Schema ({
    instructorName: { type: String, required: true }
});

const Instructor = mongoose.model('Instructor', InstructorSchema);
export default Instructor;