/**
 * OutletAttachment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'outlet_attachment',

  attributes: {

    outlet: {
      model: 'outlet',
    },

    address: {
      model: 'attachment',
    },

  }
}
