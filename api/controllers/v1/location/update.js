module.exports = {


  friendlyName: 'Update',


  description: 'Update Location.',


  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'Location ID',
    },

    name: {
      type: 'string',
      description: 'Full representation of the Location Name',
      maxLength: 120,
      example: 'Provosion'
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

    notFound: {
      responseType: 'notFound',
    },

  },


  fn: async function (inputs, exits) {
    let location = await Location.findOne(inputs.id);
    if (!location) return exits.notFound({ error: 'Location not found' });

    if (inputs.name)
      location = await Location.updateOne(inputs.id)
        .set({ name: inputs.name.toLowerCase() })
        .intercept('E_UNIQUE', 'nameAlreadyInUse')
        .intercept({ name: 'UsageError' }, 'invalid')

    return exits.success(location);

  }


};

