/**
 * Slot.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

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

    outlet: {
      model: 'outlet',
    },

    slotTime: {
      collection: 'slotTime'
    }

  },

};

