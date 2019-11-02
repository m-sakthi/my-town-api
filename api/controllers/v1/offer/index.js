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
    // let records = await Offer.query('SELECT offer.name FROM offer WHERE offer.name = ?',
    //   [ 'offer' ] )
    return exits.success(records);
  }

};
