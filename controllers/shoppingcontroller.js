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

// Get shopping item by ID
export const getShoppingItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const shoppingItem = await Shopping.findById(id).populate('user product');
    if (!shoppingItem) {
      return res.status(404).json({ message: 'Shopping item not found' });
    }
    res.json(shoppingItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve shopping item', error });
  }
};

// Create a new shopping item
export const createShoppingItem = async (req, res, next) => {
  console.log({req});
  try {
    const shoppingItem = new Shopping({ 
      user: req.body.user,
      product: req.body.product,
      quantity: req.body.quantity
     });
     console.log({shoppingItem});
    // const savedShoppingItem = await shoppingItem.save();
    await shoppingItem.save();

    res.status(201).json({ message: 'Shopping item created successfully', shoppingItem });
  } catch (error) {
    next(error);
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
