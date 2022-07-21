const Category = require('../models/Category');

// CREATE NEW CATEGORY
const createNewCat = async (req, res) => {
  try {
    const newCat = await Category.create({
      name: req.body.name,
    });
    res.status(201).json(newCat);
  } catch (err) {
    console.error(err);
  }
};

// GET CATEGORY
const getCat = async (req, res) => {
  const cat = await Category.findOne(req.params.name).exec();
  if (!cat) {
    return res
      .status(204)
      .json({ message: `No category matches ${req.params.name}.` });
  }
  res.json(cat);
};

// UPDATE CATEGORY
const updateCat = async (req, res) => {
  try {
    const cat = await Category.findOne(req.params.name).exec();
    try {
      const updatedCat = await Category.findOneAndUpdate(
        req.params.name,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCat);
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
};

// DELETE CATEGORY
const deleteCat = async (req, res) => {
  try {
    const cat = await Category.findOneAndDelete(req.params.name).exec();
    try {
      await cat.delete();
      res.status(200).json({ message: 'Category has been deleted...' });
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
};

// GET ALL CATEGORY
const getAllCats = async (req, res) => {
  const cats = await Category.find();
  if (!cats) return res.status(204).json({ message: 'No category found.' });
  res.json(cats);
};

module.exports = {
  createNewCat,
  getCat,
  updateCat,
  deleteCat,
  getAllCats,
};
