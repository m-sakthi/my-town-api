module.exports = {

  friendlyName: 'Confirm',

  description: 'Confirm auth.',

  inputs: {

    type: {
      type: 'string',
      required: true,
      isIn: ['email', 'mobile'],
    },

    value: {
      type: 'string',
      required: true,
      description: 'Email Address / Mobile number'
    },

  },

  exits: {

    errorSendingToken: {
      responseType: 'badRequest',
      description: 'Error While sending email or mobile token.'
    },

    invalid: { responseType: 'badRequest', },

    invalidOrExpiredToken: {
      responseType: 'badRequest',
      description: 'The provided token is expired, invalid, or already used up.',
    },

    alreadyConfirmed: {
      responseType: 'badRequest',
    }

  },

  fn: async function (inputs, exits) {
    let criteria = { emailAddress: inputs.value.toLowerCase() };
    if (inputs.type === 'mobile') criteria = { mobileNo: inputs.value };

    let user = await User.findOne(criteria);
    if (!user) return exits.invalid({ error: 'Invalid ' + inputs.type });

    const token = User.generateToken();
    if (inputs.type === 'email') {
      sails.hooks.email.send(
        "verifyAccount",
        {
          fullName: user.firstName + " " + user.lastName,
          token
        },
        {
          to: user.email,
          subject: 'My Town email verification'
        },
        function (err) {
          // console.log(err || "It worked!");
          if (err)
            return exits.errorSendingToken({ error: 'Error while sending email verification. ' + err });
          else {
            User.updateOne(user.id).set({
              emailProofToken: token,
              emailProofTokenExpiresAt: new Date(Date.now() + emailProofTokenValidity),
              emailStatus: 1
            });
            return exits.success({ message: 'Succesfully sent.' });
          }
        }
      )

    } else if (inputs.type === 'mobile') {
      try {
        await sails.helpers.sendOtp.with({ id: user.id, mobileNo: user.mobileNo });
        return exits.success({ message: 'Succesfully sent.' });
      } catch (err) {
        return exits.errorSendingToken({ error: err });
      }

    }

  }

};
