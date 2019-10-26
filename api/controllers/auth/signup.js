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
      required: true,
      type: 'string',
      example: '+91 2342424234',
      description: 'Mobile number for OTP verification and other services,',
    },

  },

  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

    emailAlreadyInUse: {
      statusCode: 400,
      description: 'The provided email address is already in use.',
    },

  },

  fn: async function (inputs, exits) {

    var newEmailAddress = inputs.emailAddress.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await User.create({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      mobileNo: inputs.mobileNo,
    })
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();
    
    // Store the user's new id in their session.
    // this.req.session.userId = newUserRecord.id;

    // if (sails.config.custom.verifyEmailAddresses) {
    //   // Send "confirm account" email
    //   await sails.helpers.sendTemplateEmail.with({
    //     to: newEmailAddress,
    //     subject: 'Please confirm your account',
    //     template: 'email-verify-account',
    //     templateData: {
    //       fullName: inputs.fullName,
    //       token: newUserRecord.emailProofToken
    //     }
    //   });
    // } else {
    //   sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
    // }

    // Since everything went ok, send our 200 response.
    return exits.success(newUserRecord);

  }

};
