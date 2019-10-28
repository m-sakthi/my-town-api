module.exports = {

  friendlyName: 'Delete',

  description: 'Delete Item.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Item ID',
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

    await Item.destroyOne(inputs.id);
    return exits.success();
  }

};
