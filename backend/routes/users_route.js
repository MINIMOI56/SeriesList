var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user_entity.js');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET all users */
router.get('/', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* GET user by id*/
router.get('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const users = await User.findById(req.params.id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* PUT user by id */
router.put('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    let updatedUser = req.body;
    delete updatedUser._id;
    const user = await User.findByIdAndUpdate(req.params.id, { $set: updatedUser });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* DELETE user by id */
router.delete('/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});


/**
 * User login
 * @param The user email and password
 * @returns The authentication token
 * @throws An error if the email or password is invalid
 * @throws An error if the password does not respect the criteria
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

  mongoose.connection.close();
});


/**
 * User registration
 * @param The user email and password
 * @returns A message if the user is created
 * @middleware validateToken
 * @throws An error if the email is already used
 * @throws An error if the password does not respect the criteria
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
  } finally {
    mongoose.connection.close();
  }
});

module.exports = router;