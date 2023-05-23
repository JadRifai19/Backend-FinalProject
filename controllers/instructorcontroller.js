import Instructor from '../models/instructormodels.js';

// Get all instructors
export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve instructors', error });
  }
};

// Get instructor by ID
export const getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findById(id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve instructor', error });
  }
};

// Create a new instructor
export async function createInstructor(req, res, next) {
  const model = new Instructor(req.body);
  await model
    .save()
    .then((data) => {
      return res.status(201).send({ status: 201, data });
    })
    .catch((err) => {
      next(err);
    });
}


// Update an instructor
export const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { instructorName } = req.body;
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      id,
      { instructorName },
      { new: true }
    );
    if (!updatedInstructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json(updatedInstructor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update instructor', error });
  }
};

// Delete an instructor
export const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInstructor = await Instructor.findByIdAndDelete(id);
    if (!deletedInstructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete instructor', error });
  }
};
