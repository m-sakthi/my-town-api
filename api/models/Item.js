/**
 * Item.js
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
      description: 'Full representation of the Item Name',
      maxLength: 120,
      example: 'Thoordaal'
    },

    overview: {
      type: 'string',
      required: true,
      description: 'Some overview about that Item',
      example: 'Thoordaal contains good amount of protein',
    },

    price: {
      type: 'string',
      required: true,
      description: 'Price for the item',
      example: '100',
    },

    category: {
      model: 'category',
    },

  },

};

