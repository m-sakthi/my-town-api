module.exports = function (req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, { error: 'Wrong authorization format' });
    }
  } else {
    return res.json(401, { error: 'Authorization header not found' });
  }

  JwtAuth.verifyToken(token, async function (err, decodedToken) {
    if (err) return res.json(401, { error: 'Invalid Token' });
    req.token = decodedToken.sub;
    req.currentUser = await User.findOne(decodedToken.sub).omit(['password']);
    next();
  });
};