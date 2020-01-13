module.exports = {
  friendlyName: 'Create',

  description: 'Create user.',

  inputs: {
    emailAddress: {
      type: 'string',
      required: true,
      isEmail: true,
      maxLength: 200,
      description: 'Email Id',
      example: 'carol.reyna@microsoft.com'
    },

    password: {
      type: 'string',
      required: true,
      maxLength: 32,
      description: 'Securely hashed representation of the user\'s login password.',
      example: 'passwordlol'
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
      description: 'Mobile number',
      maxLength: 20,
      example: '1231312313'
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
      responseType: 'errorHandler',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },

    notFound: {
      responseType: 'notFound',
    },
  },

  fn: async function (inputs, exits) {
    if (inputs.locationId && !await Location.findOne(inputs.locationId))
      return exits.notFound({ error: 'Location not found' });

    var newUserRecord = await User.create({
      emailAddress: inputs.emailAddress.toLowerCase(),
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      mobileNo: inputs.mobileNo,
      gender: inputs.gender && inputs.gender.toLowerCase(),
      location: inputs.locationId,
    })
      .intercept(err => { exits.invalid(err) })
      .fetch();

    return exits.success(newUserRecord);
  }

};
