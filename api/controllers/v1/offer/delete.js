module.exports = {

  friendlyName: 'Delete',

  description: 'Delete Offer',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Offer ID',
    },

  },

  exits: {

    insufficientPrivilege: {
      responseType: 'forbidden',
    },

  },

  fn: async function (inputs, exits) {
    if (this.req.currentUser.role !== "admin")
      return exits.insufficientPrivilege();

    await Offer.destroyOne(inputs.id);
    return exits.success();
  }

};
