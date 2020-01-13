module.exports = function badRequest(error = null) {

  var req = this.req;
  var res = this.res;

  if (req.wantsJSON) {
    if (error.code) {
      if (error.code === "E_UNIQUE")
        return res.status(400).send({ error: error.attrNames + " " + error.message });
      else if (error.code === "E_MISSING_OR_INVALID_PARAMS")
        return res.status(400).send({ error: error.problems });
      else if (error.code === "E_INVALID_NEW_RECORD")
        return res.status(400).send({ error: error.details });
      else return res.status(400).send({ error });
    } else
      return res.status(400).send(error ? { error } : { error: 'Bad Request' });
  }

  else return res.redirect('/login');

};
