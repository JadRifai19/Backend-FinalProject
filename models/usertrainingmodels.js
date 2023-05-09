import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const UserTrainingSchema = ({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingSession', required: true }
});

const UserTraining = mongoose.model('usertraining', UserTrainingSchema);
export default UserTraining;