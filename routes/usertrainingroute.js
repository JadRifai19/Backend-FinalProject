import express from 'express';
import {
  getAllUserTrainings,
  getUserTrainingById,
  createUserTraining,
  deleteUserTraining,
} from '../controllers/usertrainingcontroller.js';

const router = express.Router();

// Get all user trainings
router.get('/usertrainings', getAllUserTrainings);

// Get user training by ID
router.get('/usertrainings/:id', getUserTrainingById);

// Create a new user training
router.post('/usertrainings', createUserTraining);

// Delete a user training
router.delete('/usertrainings/:id', deleteUserTraining);

export default router;
