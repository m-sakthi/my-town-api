module.exports = {

  friendlyName: 'List',

  description: 'List Offer',

  inputs: {

    resourceType: {
      type: 'string',
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

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    var records = await Offer.find(inputs).sort('sequence');
    return exits.success(records);
  }

};
