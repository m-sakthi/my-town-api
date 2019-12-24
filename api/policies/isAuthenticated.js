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
      return res.status(401).json({ error: 'Invalid authorization header.' });
    }
  } else {
    return res.status(401).json({ error: 'Authorization header not found.' });
  }

  JwtAuth.verifyToken(token, async function (err, decodedToken) {
    if (err) return res.json(401, { error: 'Invalid Token' });
    req.token = decodedToken.sub;

    const user = await User.findOne(decodedToken.sub).omit(['password']);
    const roles = await sails.config.knex.select('name', 'resourceId', 'resourceType')
      .from('role')
      .join('user_role', function () {
        this.on('role.id', '=', 'user_role.role', 'resourceType')
          .andOn('user_role.user', '=', user.id)
      });

    req.currentUser = { ...user, roles };
    next();
  });
};