module.exports = function badRequest(error = null) {

  var req = this.req;
  var res = this.res;

  if (req.wantsJSON)
    return res.status(400).send(error || { error: 'Bad Request' });

  else return res.redirect('/login');

};
