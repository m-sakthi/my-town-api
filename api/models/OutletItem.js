/**
 * OutletItem.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'outletitem',

  attributes: {

    overview: {
      type: 'string',
      description: 'Offered amenities can be described',
      example: 'Haircut will be provided with Hairwash'
    },

    price: {
      type: 'number',
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
