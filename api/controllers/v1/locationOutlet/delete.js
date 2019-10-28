module.exports = {

  friendlyName: 'Delete',

  description: 'Delete LocationOutlet.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'LocationOutlet ID',
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

    await LocationOutlet.destroyOne(inputs.id);
    return exits.success();
  }

};
