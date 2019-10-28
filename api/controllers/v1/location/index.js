module.exports = {

  friendlyName: 'List',

  description: 'List Locations.',

  inputs: {

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    var records = await Location.find();
    return exits.success(records);
  }

};
