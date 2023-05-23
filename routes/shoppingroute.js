import express from 'express';
import {
  getAllShoppingItems,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
  getShoppingItemById
} from '../controllers/shoppingcontroller.js';

const router = express.Router();

// GET /shopping
router.get('/', getAllShoppingItems);

// GEt shopping by ID
router.get('/:id', getShoppingItemById);

// POST /shopping
router.post('/', createShoppingItem);

// PUT /shopping/:id
router.put('/:id', updateShoppingItem);

// DELETE /shopping/:id
router.delete('/:id', deleteShoppingItem);

export default router;
