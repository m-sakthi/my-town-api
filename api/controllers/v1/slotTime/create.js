module.exports = {

  friendlyName: 'Create',

  description: 'Create Slot.',

  inputs: {

    startTime: {
      type: 'number',
      required: true,
      description: 'Slot Start Time',
      example: 22.30
    },

    endTime: {
      type: 'number',
      required: true,
      description: 'Slot End Time',
      example: 24.30
    },

    slotId: {
      type: 'number',
      required: true,
      description: 'Slot Id',
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

    var slot = await Slot.findOne(inputs.slotId);
    if (!slot) return exits.notFound({ error: 'Slot not found' });

    let newRecord = await SlotTime.create({ ...inputs, slot: inputs.slotId })
      .intercept(err => { exits.invalid(err) })
      .fetch();

    return exits.success(newRecord);

  }

};