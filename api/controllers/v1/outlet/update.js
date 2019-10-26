module.exports = {


  friendlyName: 'Update',


  description: 'Update category.',


  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'Category ID',
    },

    name: {
      type: 'string',
      description: 'Full representation of the Outlet Name',
      maxLength: 120,
      example: 'Provosion'
    },

    overview: {
      type: 'string',
      description: 'Some overview about that Outlet',
      example: 'All Provosional items will be available',
    },

    address: {
      type: 'string',
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
    var outlet = await Outlet.findOne(inputs.id);
    if (!outlet) {
      return exits.notFound({ error: 'Outlet not found' });
    }

    var payload = {};
    if (inputs.name != undefined) {
      var newName = inputs.name.toLowerCase();
      payload = Object.assign(payload, { name: newName });
    }

    if (inputs.overview != undefined) {
      payload = Object.assign(payload, { overview: inputs.overview });
    }

    if (inputs.address != undefined) {
      payload = Object.assign(payload, { address: inputs.address });
    }

    if (inputs.longitude != undefined) {
      payload = Object.assign(payload, { longitude: inputs.longitude });
    }

    if (inputs.latitude != undefined) {
      payload = Object.assign(payload, { latitude: inputs.latitude });
    }

    var updatedRecord = await Outlet.update({ id: inputs.id })
    .set(payload)
    .intercept('E_UNIQUE', 'nameAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return exits.success(updatedRecord);

  }


};

