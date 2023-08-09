var express = require('express');
var router = express.Router();

/**
 * Obtenir la page d'accueil
 * @return La page d'accueil
 * @throws 500 - Erreur Interne du Serveur
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
