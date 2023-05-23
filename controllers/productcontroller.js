import Product from '../models/productmodels.js';
import userModel from '../models/usermodels.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products', error });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product', error });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    // console.log('Creating a product');
    console.log(req.body);
    const data = req.body;
    const user = await userModel.findById(req.body.user_Id);
    if (!user)
    return res.status(404).json({ message: "User not found" });
    
    const product = new Product({
      productName: req.body.productName,
      description:req.body.description,
      price:req.body.price,
      image:req.file.path,
      user_Id:req.body.user_Id,
    });
    await product.save();
    res.status(200).json({ message: "New Product created successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price, imageUrl } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productName, description, price, imageUrl },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};
