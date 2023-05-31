import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productcontroller.js';
import imageHandler from '../middleware/image.js';

const router = express.Router();

// GET /products
router.get('/', getAllProducts);

// GET /products/:id
router.get('/:id', getProductById);

// POST /products
router.post('/', createProduct);

// PUT /products/:id
router.put('/:id', updateProduct);

// DELETE /products/:id
router.delete('/:id', deleteProduct);

export default router;
