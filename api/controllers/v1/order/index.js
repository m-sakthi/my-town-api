module.exports = {

  friendlyName: 'List',

  description: 'List Orders.',

  inputs: {

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    var records = await Order.find({ user: this.req.currentUser.id });
    return exits.success(records);
  }

};