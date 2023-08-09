var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment_entity');
const Media = require('../models/media_entity');
const User = require('../models/user_entity');
require('dotenv').config();
const validateToken = require('../middleware/authMiddleware.js');

/** `
 * Obtenir tous les commentaires
 * @return Tous les commentaires
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const Comments = await Comment.find();
    res.json(Comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenir tous les utilisateurs qui ont commenté un média
 * @return Tous les utilisateurs qui ont commenté un média
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/users/:mediaId', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const Comments = await Comment.find({ media_id: req.params.mediaId });
    const users = await User.find({ _id: { $in: Comments.map(comment => comment.user_id) } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenire tout les nouveaux commentaires
 * @return Tout les nouveaux commentaires
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/newest', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const Comments = await Comment.find().sort({ start_date: -1 });
    res.json(Comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenir un commentaire par son id
 * @return Un commentaire par son id
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const Comments = await Comment.findById(req.params.id);
    res.json(Comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenir les commentaires d'un média
 * @return Les commentaires d'un média
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/media/:mediaId', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const Comments = await Comment.find({ media_id: req.params.mediaId });
    res.json(Comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenir les commentaires d'un utilisateur
 * @return Les commentaires d'un utilisateur
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/user/:userId', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const Comments = await Comment.find({ user_id: req.params.userId });
    res.json(Comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Envoyer un commentaire
 * @return Le commentaire envoyé
 * @throws 400 - Erreur de la requête
 * @throws 500 - Erreur Interne du Serveur
 * @throws 401 - Erreur d'authentification
 */
router.post('/:userId/:mediaId', validateToken, async (req, res) => {
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


/**
 * Modifier un commentaire
 * @return Le commentaire modifié
 * @throws 400 - Erreur de la requête
 * @throws 500 - Erreur Interne du Serveur
 * @throws 401 - Erreur d'authentification
 */
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


/**
 * Supprimer un commentaire
 * @return Le commentaire supprimé
 * @throws 400 - Erreur de la requête
 * @throws 500 - Erreur Interne du Serveur
 */
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