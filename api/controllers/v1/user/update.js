module.exports = {

  friendlyName: 'Update',

  description: 'Update User.',

  inputs: {
    emailAddress: {
      type: 'string',
      isEmail: true,
      maxLength: 200,
      description: 'Email Id',
      example: 'carol.reyna@microsoft.com'
    },

    password: {
      type: 'string',
      maxLength: 32,
      description: 'Securely hashed representation of the user\'s login password.',
      example: 'passwordlol'
    },

    firstName: {
      type: 'string',
      description: 'User\'s first name',
      maxLength: 60,
      example: 'Jose'
    },

    lastName: {
      type: 'string',
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
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },

    emailAlreadyInUse: {
      description: 'The provided email address is already in use.',
      responseType: 'badRequest'
    },

  },

  fn: async function (inputs, exits) {
    let { currentUser } = this.req;

    currentUser = { ...currentUser, ...inputs };

    if (inputs.emailAddress)
      currentUser = { ...currentUser, emailAddress: inputs.emailAddress.toLowerCase() };

    if (inputs.gender)
      currentUser = { ...currentUser, gender: inputs.gender.toLowerCase() };

    if (inputs.locationId) {
      if (await Location.findOne(inputs.locationId))
        currentUser = { ...currentUser, locationId };
      else return exits.notFound({ error: 'Location not found' });
    }

    let updatedRecord = await User.updateOne(currentUser.id)
      .set(currentUser)
      .intercept('E_UNIQUE', 'nameAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid');

    return exits.success(updatedRecord);
  }

};
