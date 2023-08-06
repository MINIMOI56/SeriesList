var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment_entity');
const Media = require('../models/media_entity');
const User = require('../models/user_entity');
require('dotenv').config();

/* GET all comments*/
router.get('/', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const Comments = await Comment.find();
    res.json(Comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* GET the newest Comments*/
router.get('/newest', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const Comments = await Comment.find().sort({ start_date: -1 });
    res.json(Comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* GET Comment by id*/
router.get('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const Comments = await Comment.findById(req.params.id);
    res.json(Comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET Comment by mediaId*/
router.get('/media/:mediaId', async (req, res) => {
    await mongoose.connect(process.env.MONGO_APP_URI);
    try {
        const Comments = await Comment.find({ media_id: req.params.mediaId });
        res.json(Comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/* GET Comment by userId*/
router.get('/user/:userId', async (req, res) => {
    await mongoose.connect(process.env.MONGO_APP_URI);
    try {
        const Comments = await Comment.find({ user_id: req.params.userId });
        res.json(Comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/* POST new Comment */
router.post('/:userId/:mediaId', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send({ error: 'The user does not exist.' })

        const media = await Media.findById(req.params.mediaId);
        if (!media) return res.status(400).send({ error: 'The media does not exist.' })

        const newComment = new Comment(req.body);
        newComment.user_id = user._id;
        newComment.media_id = media._id;
        newComment.created_at = Date.now();
        newComment.modified = false;
        await newComment.save();
        res.json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/* PUT Comment by id */
router.put('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    let updatedComment = req.body;
    delete updatedComment._id;
    updatedComment.modified = true;
    const comment = await Comment.findByIdAndUpdate(req.params.id, { $set: updatedComment });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/* DELETE Comment by id */
router.delete('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    res.json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;