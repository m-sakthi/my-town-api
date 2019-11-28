/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    totalPrice: {
      type: 'number',
      required: true,
    },

    status: {
      type: 'string',
      required: true,
      isIn: ['active', 'dispatched', 'delivered', 'cancelled']
    },

    notes: {
      type: 'string',
      description: 'Some additional notes needs can be added',
    },

    user: {
      model: 'user',
    },

    address: {
      model: 'address'
    },

  },

};

