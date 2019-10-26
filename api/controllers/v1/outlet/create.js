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

    address: {
      type: 'string',
      required: true,
      description: 'Full Address of the Outlet',
      example: 'No 123, Abc Street, XYZ city, PQR state.',
    },

    longitude: {
      type: 'number',
      description: 'Longitude of the Outlet location',
      example: 12.9900909,
    },

    latitude: {
      type: 'number',
      description: 'Latitude of the Outlet location',
      example: 12.9900909,
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
    var newName = inputs.name.toLowerCase();

    var newOutletRecord = await Outlet.create({
      name: newName,
      overview: inputs.overview,
      address: inputs.address,
      longitude: inputs.longitude,
      latitude: inputs.latitude,
      status: 0,  // fresh status by default
    })
    .intercept('E_UNIQUE', 'nameAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return exits.success(newOutletRecord);

  }

};
