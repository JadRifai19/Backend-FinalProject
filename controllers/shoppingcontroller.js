import Shopping from '../models/shoppingmodels.js';

// Get all shopping items
export const getAllShoppingItems = async (req, res) => {
  try {
    const shoppingItems = await Shopping.find().populate('user product');
    res.json(shoppingItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve shopping items', error });
  }
};

// Create a new shopping item
export const createShoppingItem = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;
    const shoppingItem = new Shopping({ user, product, quantity });
    await shoppingItem.save();
    res.status(201).json({ message: 'Shopping item created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create shopping item', error });
  }
};

// Update a shopping item
export const updateShoppingItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, product, quantity } = req.body;
    const updatedShoppingItem = await Shopping.findByIdAndUpdate(
      id,
      { user, product, quantity },
      { new: true }
    ).populate('user product');
    if (!updatedShoppingItem) {
      return res.status(404).json({ message: 'Shopping item not found' });
    }
    res.json(updatedShoppingItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update shopping item', error });
  }
};

// Delete a shopping item
export const deleteShoppingItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShoppingItem = await Shopping.findByIdAndDelete(id);
    if (!deletedShoppingItem) {
      return res.status(404).json({ message: 'Shopping item not found' });
    }
    res.json({ message: 'Shopping item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete shopping item', error });
  }
};
