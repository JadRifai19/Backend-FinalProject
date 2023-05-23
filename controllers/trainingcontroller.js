import Training from '../models/trainingmodels.js';

// Get all training sessions
export const getAllTrainingSessions = async (req, res) => {
  try {
    const trainingSessions = await Training.find().populate('instructor');
    res.json(trainingSessions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve training sessions', error });
  }
};

// Get training session by ID
export const getTrainingSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainingSession = await Training.findById(id).populate('instructor');
    if (!trainingSession) {
      return res.status(404).json({ message: 'Training session not found' });
    }
    res.json(trainingSession);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve training session', error });
  }
};

// Create a new training session
export const createTrainingSession = async (req, res, next) => {
  try {
    const trainingSession = new Training({
      sessionCategory : req.body.sessionCategory,
      sessionDate : req.body.sessionDate,
      sessionTime : req.body.sessionTime,
      instructor : req.body.instructor,
    });
    await trainingSession.save();
    res.status(201).json({ message: 'Training session created successfully', trainingSession});
  } catch (error) {
    res.status(500).json({ message: 'Failed to create training session', error });
  }
};

// Update a training session
export const updateTrainingSession = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sessionCategory,
      sessionDate,
      sessionTime,
      instructor
    } = req.body;
    const updatedTrainingSession = await Training.findByIdAndUpdate(
      id,
      {
        sessionCategory,
        sessionDate,
        sessionTime,
        instructor
      },
      { new: true }
    ).populate('instructor');
    if (!updatedTrainingSession) {
      return res.status(404).json({ message: 'Training session not found' });
    }
    res.json(updatedTrainingSession);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update training session', error });
  }
};

// Delete a training session
export const deleteTrainingSession = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrainingSession = await Training.findByIdAndDelete(id);
    if (!deletedTrainingSession) {
      return res.status(404).json({ message: 'Training session not found' });
    }
    res.json({ message: 'Training session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete training session', error });
  }
};
