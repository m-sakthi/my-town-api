module.exports = {

  friendlyName: 'List',

  description: 'List Devices.',

  inputs: {

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    var records = await Device.find();
    return exits.success(records);
  }

};