import User from '../models/usermodels.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', error });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password  } = req.body;
    console.log(username)
    if (!username || !email || !password ) {
      return res.status(400).json({
        message: "All inputs is required",
      });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Mail exists",
      });
    }

    const newUser = new User({
      username: username,
      email: email.toLowerCase(),
      password: password,
    });
    await newUser
      .save()
      .then((response) => {
        res.status(201).json({
          success: true,
          response,
          message: "User Created Successfully",
        });
      })
      .catch((err) => {
        res.status(400).json({ success: false, err : err.message});
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
}

export const login = async (req, res, next) => {
  try {
    // Check if email and password are provided
    const { email } = req.body;

    // Check if email exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const { password, ...otherDetails } = user._doc;

    res.json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};


//get user by id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user', error });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, firstName, lastName } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        password,
        email,
        firstName,
        lastName
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};
