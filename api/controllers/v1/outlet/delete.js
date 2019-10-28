module.exports = {

  friendlyName: 'Delete',

  description: 'Delete Outlet.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Outlet ID',
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

    await Outlet.destroyOne(inputs.id);
    return exits.success();
  }

};
