module.exports = function notFound(error = null) {

  var req = this.req;
  var res = this.res;

  if (req.wantsJSON)
    return res.status(404).send(error || {
      error: 'Not Found.'
    });

  else return res.redirect('/login');

};