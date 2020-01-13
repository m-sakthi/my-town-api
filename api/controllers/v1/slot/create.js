module.exports = {

  friendlyName: 'Create',

  description: 'Create Slot.',

  inputs: {

    day: {
      type: 'string',
      required: true,
      isIn: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      description: 'Select the day type',
      example: 'sunday'
    },

    status: {
      type: 'string',
      required: true,
      isIn: ['active', 'disabled'],
      description: 'Status',
      example: 'active'
    },

    outletId: {
      type: 'number',
      required: true,
      description: 'Outlet Id',
      example: 1
    }

  },

  exits: {

    invalid: {
      responseType: 'errorHandler',
    },

    combintaionAlreadyExists: {
      status: 400,
      description: 'Combintaion already exists',
    },

    notFound: {
      statusCode: 404,
      description: 'Not found',
    },

  },

  fn: async function (inputs, exits) {

    var outlet = await Outlet.findOne(inputs.outletId);
    if (!outlet) return exits.notFound({ error: 'Outlet not found' });

    let newRecord = await Slot.create({ ...inputs, outlet: inputs.outletId })
      .intercept(err => { exits.invalid(err) })
      .fetch();

    return exits.success(newRecord);

  }

};