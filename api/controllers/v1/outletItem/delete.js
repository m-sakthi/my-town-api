module.exports = {

  friendlyName: 'Delete',

  description: 'Delete OutletItem.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'OutletItem ID',
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

    await OutletItem.destroyOne(inputs.id);
    return exits.success();
  }

};
