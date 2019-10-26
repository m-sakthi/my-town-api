/**
 * OutletItem.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    overview: {
      type: 'string',
      description: 'Offered amenities can be described',
      example: 'Haircut will be provided with Hairwash'
    },

    price: {
      type: 'number',
      required: true,
      description: 'Price for the item offered by outlet',
      example: 100.50
    },

    outlet: {
      model: 'outlet',
    },

    item: {
      model: 'item',
    },

  },

};
