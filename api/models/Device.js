/**
 * Device.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    token: {
      type: 'string',
      required: true,
      description: 'A unique Device registration token',
      example: "opiuytdfszxcvbnmmnbvdsfghjk"
    },

    platform: {
      type: 'number',
      required: true,
      isIn: Object.keys(sails.config.custom.device).map(i => parseInt(i)),
      description: 'Platform OS of the device',
      example: 1,
    },

    user: {
      model: 'user',
    },

  },

};

