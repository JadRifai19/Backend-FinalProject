import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserTrainingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  session: { type: Schema.Types.ObjectId, ref: 'TrainingSession', required: true }
});

UserTrainingSchema.pre('find', function () {
  this.populate('user').populate('session');
});

const UserTraining = model('UserTraining', UserTrainingSchema);
export default UserTraining;