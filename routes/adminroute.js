import express from 'express';
import  {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
  } from '../controllers/admincontroller.js';

const router = express.Router();

// GET all admins
router.get('/', getAllAdmins);

// GET admin by ID
router.get('/:id', getAdminById);

// POST create a new admin
router.post('/', createAdmin);

// PUT update an admin
router.put('/:id', updateAdmin);

// DELETE delete an admin
router.delete('/:id', deleteAdmin);

export default router;
