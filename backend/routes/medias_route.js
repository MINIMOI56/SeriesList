var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Media = require('../models/media_entity');
require('dotenv').config();


/**
 * Obtenir tous les médias
 * @return Tous les médias
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const medias = await Media.find();
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenir les médias les plus populaires
 * @return Les médias les plus populaires
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/mostPopular', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const medias = await Media.find().sort({ score: -1 }).limit(10);
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenir les médias les plus récents
 * @return Les médias les plus récents
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/newest', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const medias = await Media.find().sort({ start_date: -1 });
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenir un média par son id
 * @return Un média par son id
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const medias = await Media.findById(req.params.id);
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenir les médias par plusieurs ids
 * @return Les médias par plusieurs ids
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/ids/:ids', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const ids = req.params.ids.split(',');
    const medias = await Media.find({ _id: { $in: ids } });
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Ajouter un média
 * @return Le média ajouté
 * @throws 400 - Erreur de la requête
 * @throws 500 - Erreur Interne du Serveur
 */
router.post('/', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const media = new Media(req.body);
    const newMedia = await media.save();
    res.status(201).json(newMedia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
 * Modifier un média
 * @return Le média modifié
 * @throws 400 - Erreur de la requête
 * @throws 500 - Erreur Interne du Serveur
 */
router.put('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    let updatedMedias = req.body;
    delete updatedMedias._id;
    const media = await Media.findByIdAndUpdate(req.params.id, { $set: updatedMedias });
    res.json(media);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
 * Supprimer un média
 * @return Le média supprimé
 * @throws 400 - Erreur de la requête
 * @throws 500 - Erreur Interne du Serveur
 */
router.delete('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const media = await Media.findByIdAndRemove(req.params.id);
    res.json(media);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;