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

    creator: {
      model: 'user',
    }

  },

};

