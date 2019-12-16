/**
 * SlotTime.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'slot_time',

  attributes: {

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

    slot: {
      model: 'slot',
    },

  },

};

