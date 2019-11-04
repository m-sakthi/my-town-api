/**
 * OutletAddress.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'outletaddress',

  attributes: {

    outlet: {
      model: 'outlet',
    },

    address: {
      model: 'address',
    },

  },

};