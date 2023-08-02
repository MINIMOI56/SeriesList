const jwt = require('jsonwebtoken');

/**
 * Validate the token
 * @param The token
 * @returns The user
 * @throws An error if the token is invalid
 * @throws An error if the token is missing
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
