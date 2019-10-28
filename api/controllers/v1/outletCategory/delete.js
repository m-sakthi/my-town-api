module.exports = {

  friendlyName: 'Delete',

  description: 'Delete OutletCategory.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'OutletCategory ID',
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

    await OutletCategory.destroyOne(inputs.id);
    return exits.success();
  }

};
