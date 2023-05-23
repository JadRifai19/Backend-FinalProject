import UserTraining from '../models/usertrainingmodels.js';

// Get all user trainings
export const getAllUserTrainings = async (req, res) => {
    try {
      const userTrainings = await UserTraining.find()
        .populate('user', 'username')
        .populate('session', 'sessionType sessionCategory');
      res.json(userTrainings);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Get user training by ID
  export const getUserTrainingById = async (req, res) => {
    try {
      const userTraining = await UserTraining.findById(req.params.id)
        .populate('user', 'username')
        .populate('session', 'sessionType sessionCategory');
      if (!userTraining) {
        return res.status(404).json({ message: 'User training not found' });
      }
      res.json(userTraining);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'User training not found' });
      }
      res.status(500).json({ message: err.message });
    }
  };
  
  // Create a new user training
  export const createUserTraining = async (req, res) => {
    try {
      const { user, session } = req.body;
      
      const newUserTraining = new UserTraining({
        user,
        session
      });
  
      await newUserTraining.save();
  
      res.status(201).json(newUserTraining);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: err.message });
    }
  };
  
  // Delete a user training
  export const deleteUserTraining = async (req, res) => {
    try {
      const userTraining = await UserTraining.findById(req.params.id);
      if (!userTraining) {
        return res.status(404).json({ message: 'User training not found' });
      }
      await userTraining.remove();
      res.json({ message: 'User training removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'User training not found' });
      }
      res.status(500).json({ message: err.message });
    }
  };