module.exports = {

  friendlyName: 'Signup',

  description: 'Sign up for a new user account.',

  inputs: {

    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    firstName: {
      type: 'string',
      required: true,
      description: 'User\'s first name',
      maxLength: 60,
      example: 'Jose'
    },

    lastName: {
      type: 'string',
      required: true,
      description: 'User\'s last name',
      maxLength: 60,
      example: 'Lisa'
    },

    mobileNo: {
      type: 'string',
      required: true,
      example: '+91 2342424234',
      description: 'Mobile number for OTP verification and other services,',
    },

    gender: {
      type: 'string',
      isIn: ['male', 'female', 'other'],
      description: 'Gender',
      example: 'male'
    },

    locationId: {
      type: 'number',
      description: 'Location ID',
      example: 1
    },

  },

  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },

    emailAlreadyInUse: {
      statusCode: 400,
      description: 'The provided email address is already in use.',
    },

  },

  fn: async function (inputs, exits) {
    if (inputs.locationId && !await Location.findOne(inputs.locationId))
      return exits.notFound({ error: 'Location not found' });

    var newEmailAddress = inputs.emailAddress.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await User.create(Object.assign({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      mobileNo: inputs.mobileNo,
      gender: inputs.gender.toLowerCase(),
      location: inputs.locationId,
    }, sails.config.custom.verifyEmailAddresses ? {
      emailProofToken: await sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenValidity,
      emailStatus: 'unconfirmed'
    } : {}))
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    // if (sails.config.custom.verifyEmailAddresses) {
    //   sails.hooks.email.send(
    //     "verifyAccount",
    //     {
    //       fullName: inputs.firstName + ' ' + inputs.lastName,
    //       token: newUserRecord.emailProofToken
    //     },
    //     {
    //       to: newEmailAddress,
    //       subject: 'Please confirm your account'
    //     },
    //     (err) => { console.log(err || "It worked!"); }
    //   )
    //   // await sails.helpers.sendTemplateEmail.with({
    //   //   to: newEmailAddress,
    //   //   subject: 'Please confirm your account',
    //   //   template: 'verify-account-email',
    //   //   templateData: {
    //   //     fullName: inputs.firstName + ' ' + inputs.lastName,
    //   //     token: newUserRecord.emailProofToken
    //   //   }
    //   // });
    // }

    return exits.success(newUserRecord);

  }

};
