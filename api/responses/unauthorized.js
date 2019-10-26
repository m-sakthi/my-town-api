/**
 * unauthorized.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • log out the current user and redirect them to the login page
 *  • or send back 401 (Unauthorized) with no response body.
 *
 * Example usage:
 * ```
 *     return res.unauthorized();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       badCombo: {
 *         description: 'That email address and password combination is not recognized.',
 *         responseType: 'unauthorized'
 *       }
 *     }
 * ```
 */
module.exports = function unauthorized() {

  var req = this.req;
  var res = this.res;

  if (req.wantsJSON)
    return res.status(401).send({ error: 'Bad Combo. Unauthorized.' });

  else {
    if (req.session.userId)
      delete req.session.userId;

    return res.redirect('/login');
  }

};
