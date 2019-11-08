/**
 * Location.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      unique: true,
      description: 'Full representation of the Location name',
      maxLength: 120,
      example: 'Chennai'
    },

    outlets: {
      collection: 'outlet',
      via: 'location',
      through: 'locationoutlet',
    },

    // users: {
    //   collection: 'user',
    // }

  },

};

