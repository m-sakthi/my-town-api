module.exports = {


  friendlyName: 'List',


  description: 'List SlotBooking.',


  inputs: {

    status: {
      type: 'number',
      isIn: [0, 1, 2, 3],
      description: '0 -> booked, 1 -> confirmed, 2 -> accepted, 3 -> rejected',
      example: 0
    },

  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    let filters = { user: this.req.currentUser.id };
    if (inputs.status)
      filters = { ...filters, status: inputs.status };

    let records = await sails.config.knex('slot_booking')
      .select('slot_time.id', 'status', 'startTime', 'endTime',
        'slot_time.createdAt', 'slot_time.updatedAt', 'user', 'slot')
      .where(filters)
      .join('slot_time', 'slot_booking.slotTime', 'slot_time.id')
    return exits.success(records);
  }

};
