/**
 * LocationOutlet.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'locationoutlet',

  attributes: {

    status: {
      type: 'number',
      isIn: [1, 2, 3], // 1 -> open(dine and delivery), 2 -> unavailable, 3 -> closed, 4 -> only dining, 5 -> only delivery
      defaultsTo: 1,
    },

    outlet: {
      model: 'outlet',
    },

    location: {
      model: 'location',
    },

  },

};

