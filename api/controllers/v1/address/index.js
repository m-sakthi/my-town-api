module.exports = {

  friendlyName: 'List',

  description: 'List Addresses.',

  inputs: {

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    var records = await Address.find();
    return exits.success(records);
  }

};
