import express from 'express';
import {
  getAllTrainingSessions,
  createTrainingSession,
  updateTrainingSession,
  deleteTrainingSession,
  getTrainingSessionById
} from '../controllers/trainingcontroller.js';

const router = express.Router();

// GET /training
router.get('/', getAllTrainingSessions);

// GET /training by ID
router.get('/:id', getTrainingSessionById);

// POST /training
router.post('/', createTrainingSession);

// PUT /training/:id
router.put('/:id', updateTrainingSession);

// DELETE /training/:id
router.delete('/:id', deleteTrainingSession);

export default router;
