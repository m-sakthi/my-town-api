/**
 * Category.js
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
      example: 'Provison'
    },

    overview: {
      type: 'string',
      required: true,
      description: 'Some overview about that category',
      example: 'All Provisonanl items are available',
    },

    outlets: {
      collection: 'outlet',
      via: 'category',
      through: 'outletcategory',
    },

    items: {
      collection: 'item',
    }

  },

};
