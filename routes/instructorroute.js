import express from 'express';
import {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from '../controllers/instructorcontroller.js';

const router = express.Router();

// GET all instructors
router.get('/', getAllInstructors);

// GET instructor by ID
router.get('/:id', getInstructorById);

// POST create a new instructor
router.post('/', createInstructor);

// PUT update an instructor
router.put('/:id', updateInstructor);

// DELETE delete an instructor
router.delete('/:id', deleteInstructor);

export default router;
