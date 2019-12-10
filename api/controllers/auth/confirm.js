module.exports = {


  friendlyName: 'Confirm',


  description: 'Confirm auth.',


  inputs: {

    token: {
      type: 'string',
      required: true,
      description: 'token hash'
    }

  },


  exits: {

    invalidOrExpiredToken: {
      responseType: 'badRequest',
      description: 'The provided token is expired, invalid, or already used up.',
    },

    alreadyConfirmed: {
      responseType: 'badRequest',
    } 

  },


  fn: async function (inputs) {

    if (!inputs.token) {
      throw 'invalidOrExpiredToken';
    }

    var user = await User.findOne({ emailProofToken: inputs.token });

    if (!user || user.emailProofTokenExpiresAt <= Date.now()) {
      throw 'invalidOrExpiredToken';
    }

    if (user.emailStatus === 'unconfirmed') {
      await User.update({ id: user.id }).set({
        emailStatus: 'confirmed',
        emailProofToken: '',
        emailProofTokenExpiresAt: 0
      });
      
      return exits.success({ api_key: JwtAuth.issueToken({ sub: user.id }) });
    }
  
    return exits.alreadyConfirmed({ error: 'Email already confirmed' });

  }


};
