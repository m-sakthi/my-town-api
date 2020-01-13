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
      example: 'Provision'
    },

    overview: {
      type: 'string',
      required: true,
      maxLength: 255,
      description: 'Some overview about that category',
      example: 'All Provisonanl items are available',
    },

    nature: {
      type: 'number',
      defaultsTo: 1,
      isIn: [1, 2], // 1 -> primary, 2 -> secondary
      description: 'Nature or Type of image',
    },

    outlets: {
      collection: 'outlet',
      via: 'category',
      through: 'outletcategory',
    },

    items: {
      collection: 'item',
    },

    attachment: {
      model: 'attachment'
    }


  },

};
