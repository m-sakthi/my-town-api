/**
 * Outlet.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      unique: true,
      description: 'Full representation of the Caregory Name',
      maxLength: 120,
      example: 'Indian Parlour',
    },

    address: {
      type: 'string',
      required: true,
      description: 'Full Address of the Outlet',
      example: 'No 123, Abc Street, XYZ city, PQR state.',
    },

    overview: {
      type: 'string',
      required: true,
      description: 'Some overview about that Outlet',
      example: 'Facial/Haircut/Massage',
    },

    status: {
      type: 'number',
      isIn: [0, 1, 2],  // 0 => fresh, 1 => active, 2 => deleted
      defaultsTo: 0,
    },

    longitude: {
      type: 'number',
      // required: true
    },

    latitude: {
      type: 'number',
      // required: true
    },

    categories: {
      collection: 'category',
      via: 'outlet',
      through: 'outletcategory',
    },

    locations: {
      collection: 'location',
      via: 'outlet',
      through: 'locationoutlet',
    },

  },

};
