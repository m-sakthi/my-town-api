module.exports = {

  friendlyName: 'Update',

  description: 'Update LocationOutlet.',

  inputs: {
    outletId: {
      type: 'number',
      required: true,
      description: 'Outlet Id',
      example: 123
    },

    locationId: {
      type: 'number',
      required: true,
      description: 'Location ID',
      example: 12,
    },

    status: {
      type: 'number',
      required: true,
      description: 'Status',
      example: 1
    }
  },

  exits: {
    invalid: {
      responseType: 'errorHandler',
    },

    notFound: {
      statusCode: 404,
      description: 'Not found',
    },

  },

  fn: async function (inputs, exits) {
    let record = await LocationOutlet.findOne({
      outlet: inputs.outletId,
      location: inputs.locationId
    });

    if (!record) return exits.notFound({
      error: 'Location-Outlet not found.'
    });

    newRecord = await LocationOutlet.updateOne(record.id)
      .set({ status: inputs.status })
      .intercept(err => { exits.invalid(err) });

    return exits.success(newRecord);

  }

};