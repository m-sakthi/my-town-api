module.exports = {

  friendlyName: 'Confirm',

  description: 'Confirm OTP.',

  inputs: {

    mobileNo: {
      type: 'string',
      required: true,
      description: 'Mobile number',
      example: '+9198765432112'
    },

    mobileToken: {
      type: 'number',
      required: true,
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

    const user = await User.findOne({
      mobileNo: inputs.mobileNo,
      mobileVerificationToken: inputs.mobileToken
    });

    if (!user) return exits.invalid({ error: 'Invalid mobile number or token' });

    if (user.mobileVerificationStatus === 1) {
      await User.update({ id: user.id }).set({
        mobileVerificationStatus: 3,
        mobileVerificationToken: null,
      });

      return exits.success({ api_key: JwtAuth.issueToken({ sub: user.id }) });
    }

    return exits.alreadyConfirmed({ error: 'Mobile number already confirmed' });

  }


};
