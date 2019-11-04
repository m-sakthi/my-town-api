/**
 * LocationOutlet.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    isPrimary: {
      type: 'boolean',
      description: 'true/false. Whether this location is primary for user',
      example: true,
    },

    doorNo: {
      type: 'string',
      description: 'Door/Flat/Building number',
      example: '7G'
    },

    line1: {
      type: 'string',
      description: 'Street/Locality name',
      example: 'Rainbow Colony'
    },

    line2: {
      type: 'string',
      description: 'Area/Villege/Town/District name',
      example: 'Kotturpuram, Chennai'
    },

    state: {
      type: 'string',
      description: 'State',
      example: 'Tamilnadu'
    },

    landmark: {
      type: 'string',
      description: 'Landmark',
      example: 'ABC Apartment'
    },

    pincode: {
      type: 'string',
      description: 'Pincode for your address',
      example: '600001'
    },

    longitude: {
      type: 'number',
    },

    latitude: {
      type: 'number',
    },

    outlets: {
      collection: 'outlet',
      via: 'address',
      through: 'outletaddress',
    },

    users: {
      collection: 'user',
      via: 'address',
      through: 'useraddress',
    },

  },

};