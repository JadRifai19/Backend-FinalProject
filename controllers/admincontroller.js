import Admin from '../models/adminmodels.js';

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve admins', error });
  }
};

// Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve admin', error });
  }
};

// Create a new admin
export async function createAdmin(req, res, next) {
    const model = new Admin(req.body);
    await model
      .save()
      .then((data) => {
        return res.status(201).send({ status: 201, data });
      })
      .catch((err) => {
        next(err);
      });
  }

// Update an admin
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update admin', error });
  }
};

// Delete an admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete admin', error });
  }
};
