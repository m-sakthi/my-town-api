module.exports = {

  friendlyName: 'Create',

  description: 'Update Slot Booking.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Slot Booking Id',
      example: 1
    },

    status: {
      type: 'number',
      isIn: [0, 1, 2, 3],
      description: '0 -> booked, 1 -> confirmed, 2 -> accepted, 3 -> rejected',
      example: 0
    },

    slotTimeId: {
      type: 'number',
      description: 'Slot Time Id',
      example: 1
    },

    userId: {
      type: 'number',
      description: 'User Id',
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
    let slotBooking = await SlotBooking.findOne(inputs.id);
    if (!slotBooking) return exits.notFound({ error: 'Slot Booking not found' });

    let payload = { status: inputs.status }
    if (inputs.slotId && await SlotTime.findOne(inputs.slotTimeId))
      payload = { ...payload, slotTime: inputs.slotTimeId };
    else return exits.notFound({ error: 'Slot Time not found' });

    if (inputs.slotId && await User.findOne(inputs.userId))
      payload = { ...payload, user: inputs.userId };
    else return exits.notFound({ error: 'User not found' });

    let updatedRecord = await SlotBooking.create(payload)
      .intercept(err => { exits.invalid(err) })
      .fetch();

    return exits.success(updatedRecord);

  }

};