module.exports = {

  friendlyName: 'List',

  description: 'List Cart items.',

  inputs: {

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    var records = await Cart.find({ user: this.req.currentUser.id });
    return exits.success(records);
  }

};