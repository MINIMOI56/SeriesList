const jwt = require('jsonwebtoken');

/**
 * Valider le jeton
 * @param Le jeton
 * @returns L'utilisateur
 * @throws Une erreur si le jeton n'est pas valide
 * @throws Une erreur si le jeton est manquant
 */
function validateToken(req, res, next) {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status('401').json({ error: 'The validation token is missing' })
  
    jwt.verify(token, process.env.SECRET, (err, user) => {
  
      if (err) return res.status('401').json({ error: 'The validation token is invalid' })
  
      req.user = user
  
      next()
    });
  
  }

module.exports = validateToken;
