/**
 * Offer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the Offer Name',
      maxLength: 120,
      example: 'Freedom Offer'
    },

    overview: {
      type: 'string',
      required: true,
      description: 'Some overview about that offer',
      example: 'All Provisonanl items are available at 50% discount',
    },

    percentage: {
      type: 'number',
      required: true,
      description: '% off from original price',
      example: 10,
    },

    startTime: {
      type: 'number',
      // columnType: 'bigint',
      required: true,
      description: 'Offer Start Time',
      example: 1502844074211,
    },

    endTime: {
      type: 'number',
      // columnType: 'bigint',
      required: true,
      description: 'Offer End Time',
      example: 1502844074211,
    },

    resourceType: {
      type: 'string',
      allowNull: true,
      isIn: ['Outlet', 'OutletItem', 'Item', 'LocationOutlet'],
      description: 'To which resource the offer is tagged to.',
      example: 'Outlet',
    },

    resourceId: {
      type: 'number',
      description: 'To which resource ID the offer is tagged to.',
      example: 100,
    },

  },

};

