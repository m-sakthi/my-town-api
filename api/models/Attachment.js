/**
 * Attachment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    url: {
      type: 'string',
      required: true,
      maxLength: 500,
      description: 'URL where the file is storeds',
    },

    fileDescription: {
      type: 'string',
      required: true,
      maxLength: 500,
      description: 'Full description of the file with path',
    },

    nature: {
      type: 'number',
      defaultsTo: 1,
      isIn: [1, 2, 3], // 1 -> unclassified, 2 -> banner, 3 -> gallery
      description: 'Nature or Type of image',
    },

    creator: {
      model: 'user',
    }

  },

};

