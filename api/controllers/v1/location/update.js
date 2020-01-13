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
      responseType: 'errorHandler',
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
        .intercept(err => { exits.invalid(err) })

    return exits.success(location);

  }


};

