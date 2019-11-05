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
      description: 'URL where the file is storeds',
    },

    fileDescription: {
      type: 'string',
      required: true,
      description: 'Full description of the file with path',
    },

    creator: {
      model: 'user',
    }

  },

};

