/**
 * SlotBooking.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'slot_booking',

  attributes: {

    status: {
      type: 'number',
      required: true,
      isIn: [0, 1, 2, 3],
      description: '0 -> booked, 1 -> confirmed, 2 -> accepted, 3 -> rejected',
      example: 0
    },

    slotTime: {
      model: 'slotTime',
    },

    user: {
      model: 'user',
    }

  },

};

