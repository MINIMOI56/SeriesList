var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Media = require('../models/media_entity.js');
require('dotenv').config();

/* GET all medias */
router.get('/', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const medias = await Media.find();
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* GET most popular media*/
router.get('/mostPopular', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const medias = await Media.find().sort({ score: -1 });
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* GET the newest media*/
router.get('/newest', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const medias = await Media.find().sort({ start_date: -1 });
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* GET media by id*/
router.get('/:id', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const medias = await Media.findById(req.params.id);
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});


/* POST new media */
router.post('/', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const media = new Media(req.body);
    const newMedia = await media.save();
    res.status(201).json(newMedia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* PUT media by id */
router.put('/:id', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    let updatedMedias = req.body;
    delete updatedMedias._id;
    const media = await Media.findByIdAndUpdate(req.params.id, { $set: updatedMedias });
    res.json(media);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* DELETE media by id */
router.delete('/:id', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const media = await Media.findByIdAndRemove(req.params.id);
    res.json(media);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  } 
});

module.exports = router;