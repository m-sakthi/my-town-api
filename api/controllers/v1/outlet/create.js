module.exports = {


  friendlyName: 'Create',


  description: 'Create Outlet.',


  inputs: {
    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the Outlet Name',
      maxLength: 120,
      example: 'Provosion'
    },

    overview: {
      type: 'string',
      required: true,
      description: 'Some overview about that Outlet',
      example: 'All Provosional items will be available',
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
    var newRecord = await Outlet.create({
      name: inputs.name.toLowerCase(),
      overview: inputs.overview,
      address: inputs.address,
      longitude: inputs.longitude,
      latitude: inputs.latitude,
      status: 'active',
    })
    // .intercept('E_UNIQUE', 'nameAlreadyInUse')
    // .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return exits.success(newRecord);

  }

};
