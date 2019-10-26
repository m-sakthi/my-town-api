module.exports = {


  friendlyName: 'List',


  description: 'List Outlets.',


  inputs: {

  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    var records = await Outlet.find();
    return exits.success(records);
  }

};
