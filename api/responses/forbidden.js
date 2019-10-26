module.exports = function badRequest(error = null) {

  var req = this.req;
  var res = this.res;

  if (req.wantsJSON)
    return res.status(403).send(error || {
      error: 'Forbidden.'
    });

  else return res.redirect('/login');

};