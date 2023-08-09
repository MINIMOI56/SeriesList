var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user_entity.js');
const Media = require('../models/media_entity.js');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateToken = require('../middleware/authMiddleware.js');


/**
 * Obtenir tous les utilisateurs
 * @return Tous les utilisateurs
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenir un utilisateur par son id
 * @return Un utilisateur
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const users = await User.findById(req.params.id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Obtenir les favoris d'un utilisateur
 * @return Les favoris d'un utilisateur
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/favorite/:userId', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(400).send({ error: 'The user does not exist.' })

    const favoriteList = user.media_ids;
    res.json(favoriteList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Modifier un utilisateur
 * @return L'utilisateur modifié
 * @throws 400 - Erreur de la requête
 * @throws 500 - Erreur Interne du Serveur
 */
router.put('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    let updatedUser = req.body;
    delete updatedUser._id;
    const user = await User.findByIdAndUpdate(req.params.id, { $set: updatedUser });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
 * Supprimer un utilisateur
 * @return L'utilisateur supprimé
 * @throws 400 - Erreur de la requête
 * @throws 500 - Erreur Interne du Serveur
 */
router.delete('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
 * Connexion de l'utilisateur
 * @param L'adresse e-mail et le mot de passe de l'utilisateur
 * @returns Le jeton d'authentification
 * @throws Une erreur si l'adresse e-mail ou le mot de passe n'est pas valide
 * @throws Une erreur si le mot de passe ne respecte pas les critères
 */
router.post('/connection', async function (req, res, next) {
  await mongoose.connect(process.env.MONGO_APP_URI);

  const email = req.body.email;
  const password = req.body.password;

  const errorMessageEmail = 'The email is invalid';
  const errorMessagePassword = 'The password is invalid';

  const user = await User.findOne({ email: email })


  if (!user) return res.status('400').json(
    {
      error: errorMessageEmail
    });

  const validatedPassword = await bcrypt.compare(password, user.password);

  if (!validatedPassword) return res.status('400').json(
    {
      error: errorMessagePassword
    });

  const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '24h' });
  let expiration = new Date();
  expiration.setMinutes(expiration.getHours() + 24);
  res.cookie('token', token, {
    httpOnly: true,
    expire: expiration
  });

  res.status(200).json({ token: token });
});


/**
 * Inscription de l'utilisateur
 * @param L'adresse e-mail et le mot de passe de l'utilisateur
 * @returns Un message si l'utilisateur est créé
 * @throws Une erreur si l'adresse e-mail est déjà utilisée
 * @throws Une erreur si le mot de passe ne respecte pas les critères
 */
router.post('/inscription', async function (req, res, next) {
  await mongoose.connect(process.env.MONGO_APP_URI);

  const emailDoesExist = await User.findOne({ email: req.body.email })
  if (emailDoesExist) return res.status(400).send({ error: 'The email already exist.' })

  if (req.body.password.length < 8) {
    return res.status(400).json({ error: 'Some field are invalid.' });
  }
  const sel = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password, sel)

  const user = new User(
    {
      profile_picture: req.body.profile_picture,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    }
  )
  try {
    if (user.validateSync()) {
      res.status(400).json({ error: 'Some field are invalid.' });
    } else {
      await user.save().then(() => {
        res.status(201).json({ message: 'User created.' });
      });
    }
  }
  catch (err) {
    res.status(500).json({ error: 'An error as occured.' });
  }
});  


/**
 * Ajouter un media_id à la liste de favoris de l'utilisateur
 * @param L'identifiant de l'utilisateur et l'identifiant du média
 * @returns Un message si le média est ajouté
 * @middleware validateToken
 * @throws Une erreur si le média est déjà dans la liste de favoris
 * @throws Une erreur si le média n'existe pas
 * @throws Une erreur si l'utilisateur n'existe pas
 */
router.post('/addFavorite/:userId/:mediaId' , async function (req, res, next) {
  await mongoose.connect(process.env.MONGO_APP_URI);

  const user = await User.findById(req.params.userId);
  if (!user) return res.status(400).send({ error: 'The user does not exist.' })

  const media = await Media.findById(req.params.mediaId);
  if (!media) return res.status(400).send({ error: 'The media does not exist.' })

  const mediaDoesExist = await User.findOne({ media_ids: req.params.mediaId })
  if (mediaDoesExist) return res.status(400).send({ error: 'The media is already in the favorite list.' })

  try {
    user.media_ids.push(req.params.mediaId);
    await user.save().then(() => {
      res.status(201).json({ message: 'Media added.' });
    }).catch((err) => {
      res.status(501).json({ error: err });
    }
    );
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
});


/**
 * Supprimer un media_id de la liste de favoris de l'utilisateur
 * @param L'identifiant de l'utilisateur et l'identifiant du média
 * @returns Un message si le média est supprimé
 * @middleware validateToken
 * @throws Une erreur si le média n'est pas dans la liste de favoris
 * @throws Une erreur si le média n'existe pas
 * @throws Une erreur si l'utilisateur n'existe pas
 */
router.delete('/deleteFavorite/:userId/:mediaId' , async function (req, res, next) {
  await mongoose.connect(process.env.MONGO_APP_URI);

  const user = await User.findById(req.params.userId);
  if (!user) return res.status(400).send({ error: 'The user does not exist.' })

  const media = await Media.findById(req.params.mediaId);
  if (!media) return res.status(400).send({ error: 'The media does not exist.' })

  const mediaDoesExist = await User.findOne({ media_ids: req.params.mediaId })
  if (!mediaDoesExist) return res.status(400).send({ error: 'The media is not in the favorite list.' })

  try {
    user.media_ids.pull(req.params.mediaId);
    await user.save().then(() => {
      res.status(201).json({ message: 'Media deleted.' });
    });
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;