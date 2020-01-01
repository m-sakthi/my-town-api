module.exports = {

  friendlyName: 'Login',

  description: 'Log in using the provided email and password combination.',

  inputs: {

    emailAddress: {
      type: 'string',
      description: 'The email to try in this attempt, e.g. "irl@example.com".'
    },

    mobileNo: {
      type: 'string',
      description: 'The mobile number to try in this attempt'
    },

    password: {
      description: 'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: 'string',
      required: true
    },

  },

  exits: {

    invalid: {
      responseType: 'badRequest'
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
      responseType: 'unauthorized'
    }

  },

  fn: async function (inputs, exits) {
    if (!inputs.emailAddress && !inputs.mobileNo)
      return exits.invalid({ error: 'Either email or mobile number should be given.' });

    if (inputs.emailAddress && inputs.mobileNo)
      return exits.invalid({ error: 'Both email and mobile number should not be given.' });

    let criteria;
    if (inputs.mobileNo) criteria = { mobileNo: inputs.mobileNo };
    else if (inputs.emailAddress) criteria = { emailAddress: inputs.emailAddress.toLowerCase() };

    const user = await User.findOne(criteria);

    // If there was no matching user, respond thru the "badCombo" exit.
    if (!user) throw 'badCombo';

    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords
      .checkPassword(inputs.password, user.password)
      .intercept('incorrect', 'badCombo');

    if ((inputs.emailAddress && user.emailStatus !== 3) ||
      (inputs.mobileNo && user.mobileVerificationStatus !== 3)) {

      try {

        if (inputs.emailAddress) console.log('Cant send email now');
        else await sails.helpers.sendOtp.with({ id: user.id, mobileNo: user.mobileNo });

        return exits.success({
          error: 'Account needs to be verified before loggin in.',
          status: 'unverified'
        });

      } catch (err) {
        return exits.invalid({ error: err });
      }
    }

    return exits.success({
      api_key: JwtAuth.issueToken({ sub: user.id }),
      id: user.id
    });

  }

};
