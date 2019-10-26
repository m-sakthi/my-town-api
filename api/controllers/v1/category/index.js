module.exports = {


  friendlyName: 'List',


  description: 'List Categories.',


  inputs: {

  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    var records = await Category.find();
    return exits.success(records);
  }

};
