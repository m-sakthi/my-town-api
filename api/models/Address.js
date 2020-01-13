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
      required: true,
      description: 'Door/Flat/Building number',
      example: '7G'
    },

    line1: {
      type: 'string',
      required: true,
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
      required: true,
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
      required: true,
      description: 'Pincode for your address',
      example: '600001'
    },

    latitude: {
      type: 'string',
      description: 'latitude details',
      example: '15.887376'
    },

    longitude: {
      type: 'string',
      description: 'longitude details',
      example: '15.887376'
    },

    parentType: {
      type: 'string',
      required: true,
      isIn: ['user', 'outlet', 'locationoutlet'],
      description: 'Parent Type can be user/outlet/locationoutlet',
      example: 'user'
    },

    parentId: {
      type: 'number',
      required: true,
      description: 'User/Outlet/LocationOutlet ID',
      example: 1
    },

    user: {
      model: 'user'
    },

  },

  beforeDestroy: async (criteria, next) => {
    await UserAddress.destroy({ address: criteria.where.id });
    await OutletAddress.destroy({ address: criteria.where.id });
    next();
  },

};