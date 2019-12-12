module.exports = {


  friendlyName: 'Index',


  description: 'Index role.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var roles = await Role.find();

    return exits.success(roles);

  }


};
