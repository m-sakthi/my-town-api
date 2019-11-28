/**
 * OrderItem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'orderitem',

  attributes: {

    quantity: {
      type: 'number',
      description: 'No of items to be added.',
      example: 1
    },

    order: {
      model: 'order',
    },

    item: {
      model: 'item',
    },

  },

};

