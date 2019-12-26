module.exports = {


  friendlyName: 'Confirm',


  description: 'Confirm auth.',


  inputs: {

    emailAddress: {
      type: 'string',
      isEmail: true,
      required: true,
      description: 'Email Address'
    },

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

    var user = await User.findOne({
      emailAddress: inputs.emailAddress,
      emailProofToken: inputs.token
    });

    if (!user || user.emailProofTokenExpiresAt <= Date.now())
      return exits.invalid({ error: 'Invalid email or token' });

    if (user.emailStatus === 1) {
      await User.update({ id: user.id }).set({
        emailStatus: 3,
        emailProofToken: null,
        emailProofTokenExpiresAt: 0
      });

      return exits.success({ api_key: JwtAuth.issueToken({ sub: user.id }) });
    }

    return exits.alreadyConfirmed({ error: 'Email already confirmed' });

  }


};
