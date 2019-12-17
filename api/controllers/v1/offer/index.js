module.exports = {

  friendlyName: 'List',

  description: 'List Offer',

  inputs: {

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    var records = await Offer.find();
    return exits.success(records);
  }

};
