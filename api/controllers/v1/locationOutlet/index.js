module.exports = {

  friendlyName: 'List',

  description: 'List LocationOutlets',

  inputs: {

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    var records = await LocationOutlet.find();
    return exits.success(records);
  }

};