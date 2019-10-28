module.exports = {


  friendlyName: 'Create',


  description: 'Create Location.',


  inputs: {
    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the Location Name',
      maxLength: 120,
      example: 'Chennai'
    },
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },

    nameAlreadyInUse: {
      statusCode: 400,
      description: 'The provided name is already in use.',
    },

  },


  fn: async function (inputs, exits) {
    var newRecord = await Location.create({
      name: inputs.name,
    })
      .intercept('E_UNIQUE', 'nameAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    return exits.success(newRecord);
  }


};
