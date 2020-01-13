module.exports = {

  friendlyName: 'Create',

  description: 'Create Slot Booking.',

  inputs: {

    status: {
      type: 'number',
      required: true,
      isIn: [0, 1, 2, 3],
      description: '0 -> booked, 1 -> confirmed, 2 -> accepted, 3 -> rejected',
      example: 0
    },

    slotTimeId: {
      type: 'number',
      required: true,
      description: 'Slot Time Id',
      example: 1
    },

    userId: {
      type: 'number',
      required: true,
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

    const slot = await SlotTime.findOne(inputs.slotTimeId);
    if (!slot) return exits.notFound({ error: 'Slot not found' });

    const user = await User.findOne(inputs.userId);
    if (!user) return exits.notFound({ error: 'User not found' });

    let newRecord = await SlotBooking.create({
      status: inputs.status,
      slotTime: inputs.slotTimeId,
      user: inputs.userId
    })
      .intercept(err => { exits.invalid(err) })
      .fetch();

    return exits.success(newRecord);

  }

};