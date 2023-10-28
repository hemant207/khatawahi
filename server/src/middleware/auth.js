const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers)
  console.log("token = " + token)

  if (token) {
    try {
      const token1 = token.split(" ")[1];
      const data = jwt.verify(token1, process.env.jwt_sec_key);
      if (data) {
        req.data = data;
        console.log('user verifide....')
        next();
      }
    } catch (error) {
      // Handle invalid token
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    // Handle missing token
    res.status(401).json({ error: 'Token not found' });
  }
};

module.exports = userAuth;
