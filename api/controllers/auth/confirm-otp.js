module.exports = {

  friendlyName: 'Confirm',

  description: 'Confirm OTP.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'User ID',
      example: 1
    },

    mobileToken: {
      type: 'number',
      description: 'Mobile verification token'
    }

  },

  exits: {

    invalidOrExpiredToken: {
      responseType: 'badRequest',
      description: 'The provided token is expired, invalid, or already used up.',
    },

    invalid: {
      esponseType: 'badRequest',
    },

    alreadyConfirmed: {
      responseType: 'badRequest',
    }

  },

  fn: async function (inputs, exits) {

    if (!inputs.mobileToken) return exits.invalid({ error: 'Missing param mobileToken' });
    let user = await User.findOne({
      id: inputs.id,
      mobileToken: inputs.mobileVerificationToken
    });

    if (!user || user.mobileVerificationStatus === 3) {
      return exits.invalid({ error: 'Invalid or Expired Token' });
    }

    if (user.emailStatus === 'unconfirmed') {
      await User.update({ id: user.id }).set({
        mobileVerificationStatus: 3,
        mobileVerificationToken: null,
      });

      return exits.success({ api_key: JwtAuth.issueToken({ sub: user.id }) });
    }

    return exits.alreadyConfirmed({ error: 'Mobile number already confirmed' });

  }


};
