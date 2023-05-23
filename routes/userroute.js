import express from 'express';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById
} from '../controllers/usercontroller.js';

const router = express.Router();

// Get all users
router.get('/users', getAllUsers);

//get user by id
router.get('/users/:id',  getUserById) 

// Create a new user
router.post('/users', createUser);

// Update a user
router.put('/users/:id', updateUser);

// Delete a user
router.delete('/users/:id', deleteUser);

export default router;
