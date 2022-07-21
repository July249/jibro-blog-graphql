const Post = require('../models/Post');

// CREATE NEW POST
const createNewPost = async (req, res) => {
  if (!req?.body?.title || !req?.body?.desc || !req?.body?.categories) {
    return res
      .status(400)
      .json({ message: 'Title, description, and categories are required.' });
  }

  try {
    const newPost = await Post.create({
      title: req.body.title,
      desc: req.body.desc,
      photo: req.body.photo,
      username,
      categories: req.body.categories,
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
  }
};

// GET POST
const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).exec();
  if (!post) {
    return res
      .status(204)
      .json({ message: `No post matches ID ${req.params.id}.` });
  }
  res.json(post);
};

// UPDATE POST
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(401).json({ message: 'You can update only your post!' });
    }
  } catch (err) {
    console.error(err);
  }
};

// DELETE POST
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json({ message: 'Post has been deleted...' });
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(401).json({ message: 'You can delete only your post!' });
    }
  } catch (err) {
    console.error(err);
  }
};

// GET ALL POSTS
const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(204).json({ message: 'No posts found.' });
  res.json(posts);
};

module.exports = {
  createNewPost,
  getPost,
  updatePost,
  deletePost,
  getAllPosts,
};
